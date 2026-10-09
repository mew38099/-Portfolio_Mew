// =============================================================================
// MDT312 Assignment 6: login.js
// Description: จัดการการเข้าสู่ระบบ ดึงข้อมูลจาก localStorage มาตรวจสอบ
// =============================================================================

// เรียกใช้ฟังก์ชัน loginLoad เมื่อหน้าเว็บโหลดสมบูรณ์
window.onload = loginLoad;

function loginLoad() {
    // ผูกเหตุการณ์การส่งฟอร์ม (Submit) เข้ากับฟังก์ชัน checkLogin
    const form = document.getElementById("myLogin");
    form.onsubmit = checkLogin;
}

function checkLogin(event) {
    // -------------------------------------------------------------------------
    // Step 1: ป้องกันการรีเฟรชหน้าเว็บเมื่อกด Submit
    // -------------------------------------------------------------------------
    if (event) {
        event.preventDefault();
    }

    // -------------------------------------------------------------------------
    // Step 2: ดึงข้อมูลผู้ใช้จาก localStorage มาจัดเก็บใน Array
    // -------------------------------------------------------------------------
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    const users = [];

    // หากพบข้อมูลใน localStorage ให้นำมาสร้างเป็น Object แล้วใส่ใน Array
    if (storedUsername && storedPassword) {
        users.push({
            username: storedUsername,
            password: storedPassword
        });
    }

    // -------------------------------------------------------------------------
    // Step 3: ตรวจสอบว่ามีข้อมูลผู้ใช้ในระบบหรือไม่
    // -------------------------------------------------------------------------
    if (users.length === 0) {
        alert("ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนที่หน้า Register ก่อน");
        window.location.href = "register.html";
        return false;
    }

    // -------------------------------------------------------------------------
    // Step 4: ดึงข้อมูลจากช่องกรอกในฟอร์ม Login
    // -------------------------------------------------------------------------
    const inputUsername = document.forms["myLogin"]["username"].value.trim();
    const inputPassword = document.forms["myLogin"]["password"].value;

    // -------------------------------------------------------------------------
    // Step 5: วนลูปตรวจสอบข้อมูล Username และ Password ใน Array
    // -------------------------------------------------------------------------
    let isLoginSuccess = false;

    for (let i = 0; i < users.length; i++) {
        // เช็กว่า Username และ Password ตรงกับในระบบทั้งหมดหรือไม่
        if (users[i].username === inputUsername && users[i].password === inputPassword) {
            isLoginSuccess = true;
            break; // หากเจอข้อมูลที่ถูกต้องให้หยุดการวนลูปทันที
        }
    }

    // -------------------------------------------------------------------------
    // Step 6: แจ้งผลการเข้าสู่ระบบตามสถานะ
    // -------------------------------------------------------------------------
    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}