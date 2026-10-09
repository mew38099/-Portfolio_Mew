window.onload = setupFunction;

function setupFunction() {
    document.getElementById("top").innerText = "Welcome to the Forum";
}

// ตัวแปรนับลำดับ เริ่มที่ 0
let postCount = 0;

function postFunction() {
    // อ่านข้อความจาก textarea
    let msg = document.getElementById("message").value;

    // โพสต์ตามลำดับ 3 ช่อง
    if (postCount === 0) {
        document.getElementById("topic").innerText = msg;
    } 
    else if (postCount === 1) {
        document.getElementById("reply1").innerText = msg;
    } 
    else if (postCount === 2) {
        document.getElementById("reply2").innerText = msg;

        // ครบ 3 ครั้งแล้ว กลับไปเริ่มที่ช่องแรก
        postCount = 0;

        document.getElementById("message").value = "";
        return;
    }

    // ล้าง textarea
    document.getElementById("message").value = "";

    // เพิ่ม Count
    postCount++;
}
    
function clearFunction() {
    // ล้างทั้ง 3 ช่อง
    document.getElementById("topic").innerText = "";
    document.getElementById("reply1").innerText = "";
    document.getElementById("reply2").innerText = "";

    // ล้าง textarea
    document.getElementById("message").value = "";

    // เริ่มนับใหม่
    postCount = 0;
}
