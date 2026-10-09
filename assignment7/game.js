// =============================================================================
// MDT312 Assignment 7 - Square Game
// Modern JavaScript: DOM, Event, Timer
// =============================================================================

// เรียกใช้ฟังก์ชัน pageLoad เมื่อหน้าเว็บโหลดโครงสร้าง HTML เสร็จเรียบร้อย
window.onload = pageLoad;

// ตัวแปรสำหรับเก็บสถานะ ตัวจับเวลา (Timer ID) ไว้ใช้นับถอยหลังหรือสั่งหยุดเวลา
let timer = null;

/**
 * ฟังก์ชันเริ่มต้น ผูก Event ต่างๆ เข้ากับ Elements บนหน้าเว็บ
 */
function pageLoad() {
    // 1. ผูกเหตุการณ์เมื่อกดปุ่ม "Start" ให้ไปทำงานที่ฟังก์ชัน startGame
    const startBtn = document.getElementById("start");
    startBtn.onclick = startGame;

    // 2. ใช้ Event Delegation: ดักจับการคลิกที่กล่องแม่ (#layer) เพียงจุดเดียว
    // เพื่อประหยัดทรัพยากรและรองรับกล่องที่จะถูกสร้างขึ้นมาใหม่ภายหลัง[cite: 1]
    const gameLayer = document.getElementById("layer");
    gameLayer.onclick = function(event) {
        // เช็คว่าสิ่งที่ผู้ใช้คลิกมี class เป็น "square" (กล่องสี่เหลี่ยม) หรือไม่
        if (event.target.classList.contains("square")) {
            // ลบกล่องที่ถูกคลิกออกจากหน้าจอทันที ด้วยวิธี modern .remove()[cite: 1]
            event.target.remove();
        }
    };
}

/**
 * ฟังก์ชันเริ่มเกมใหม่
 */
function startGame() {
    alert("Ready");
    clearScreen(); // 1. ล้างกล่องเก่าที่อาจค้างอยู่ ออกจากหน้าจอ
    addBox();       // 2. สุ่มสร้างกล่องชุดใหม่ตามจำนวนและสีที่เลือก
    timeStart();    // 3. เริ่มจับเวลานับถอยหลัง
}

/**
 * ฟังก์ชันตั้งค่าและเริ่มนับถอยหลัง
 */
function timeStart() {
    const TIMER_TICK = 1000; // ระยะเวลาในการวนรอบ (1000 ms = 1 วินาที)[cite: 1]

    // ป้องกันปัญหาเวลาเดินเร็วขึ้น หากผู้ใช้กดปุ่ม Start ซ้ำๆ โดยสั่งยกเลิก timer เก่าก่อนเสมอ[cite: 1]
    if (timer !== null) {
        clearInterval(timer); // หยุดเวลาเก่า[cite: 1]
        timer = null;
    }

    const min = 0.1; // กำหนดเวลาเล่นเกม (0.5 นาที = 30 วินาที)[cite: 1, 2]
    let second = min * 60; // แปลงหน่วยนาทีให้เป็นวินาที (30)
    
    const clockDisplay = document.getElementById('clock');
    clockDisplay.textContent = second; // แสดงตัวเลขเวลาเริ่มต้นบนหน้าจอ[cite: 1]
    
    // ตั้งเวลาให้ฟังก์ชัน timeCount ทำงานซ้ำทุกๆ 1 วินาที[cite: 1]
    timer = setInterval(timeCount, TIMER_TICK);
    
    /**
     * ฟังก์ชันย่อย ตรวจสอบสถานะเกมและลดเวลาลงทีละ 1 วินาที
     */
    function timeCount() {
        // ดึงรายการกล่องสี่เหลี่ยมทั้งหมดที่เหลืออยู่ใน #layer มาเช็คจำนวน[cite: 1]
        const allbox = document.querySelectorAll("#layer div");
        
        // เงื่อนไขที่ 1: ชนะเกม (กล่องหมดแล้ว และ เวลายังเหลืออยู่)[cite: 1]
        if (allbox.length === 0 && second > 0) {
            alert("You win!");
            clearInterval(timer); // หยุดนับเวลา[cite: 1]
            timer = null;
            clockDisplay.textContent = ""; // ล้างตัวเลขบนนาฬิกา
        } 
        // เงื่อนไขที่ 2: แพ้เกม (เวลาหมดแล้ว แต่ กล่องยังเหลืออยู่)[cite: 1]
        else if (second <= 0) {
            alert("Game over");
            clearInterval(timer); // หยุดนับเวลา[cite: 1]
            timer = null;
            clearScreen(); // ลบกล่องที่เหลืออยู่ออกทั้งหมด
            clockDisplay.textContent = ""; // ล้างตัวเลขบนนาฬิกา
        } 
        // เงื่อนไขที่ 3: เกมกำลังดำเนินอยู่ (ยังมีกล่องเหลือ และ เวลายังไม่หมด)[cite: 1]
        else {
            second--; // ลดเวลาลงทีละ 1 วินาที
            clockDisplay.textContent = second; // อัปเดตตัวเลขเวลาบนหน้าจอ
        }
    }
}

/**
 * ฟังก์ชันสร้างกล่องสี่เหลี่ยมตามจำนวนและสีที่กำหนด
 */
function addBox() {
    // ดึงค่าจำนวนกล่องจากช่อง input (ถ้าไม่ใส่ค่าหรือใส่ไม่ใช่ตัวเลข ให้เปลี่ยนเป็น 0)
    const numbox = parseInt(document.getElementById("numbox").value) || 0;
    const gameLayer = document.getElementById("layer"); // กล่องแม่ #layer
    const colorDrop = document.getElementById("color").value; // ค่าสีที่เลือกจาก drop-down
    
    // วนลูปสร้างกล่องตามจำนวน numbox
    for (let i = 0; i < numbox; i++) {
        const tempbox = document.createElement("div"); // สร้าง element <div> ใหม่[cite: 1]
        
        tempbox.className = "square " + colorDrop; // กำหนดคลาสสไตล์ เช่น "square maroon"
        tempbox.id = "box" + i; // ตั้ง id ให้กล่องแต่ละอัน (เช่น box0, box1)
        
        // สุ่มตำแหน่ง X (left) และ Y (top) ภายในพื้นที่ 500x500px (ลบขนาดกล่อง 25px ไม่ให้ทะลุขอบ)
        tempbox.style.left = Math.random() * (500 - 25) + "px";
        tempbox.style.top = Math.random() * (500 - 25) + "px";
        
        // นำกล่องที่สร้างเสร็จแล้วใส่ลงไปใน #layer[cite: 1]
        gameLayer.appendChild(tempbox);
    }
}

/**
 * ฟังก์ชันลบกล่องสี่เหลี่ยมทั้งหมดออกจากหน้าจอ
 */
function clearScreen() {
    // ค้นหากล่องสี่เหลี่ยมทั้งหมดใน #layer[cite: 1]
    const allbox = document.querySelectorAll("#layer div");
    
    // วนลูปสั่งลบกล่องออกทีละอันจนหมด
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].remove(); // ลบ Node element ออกจาก DOM[cite: 1]
    }
}