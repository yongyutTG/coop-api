const express = require('express');
const router = express.Router();
const controller = require('../controllers/member-full.controller'); // นำเข้า controller เพื่อเรียกใช้ฟังก์ชันต่างๆ  

//router.get('/:memid', controller.getMemberFull);  //เรียกฟังก์ชัน getMemberFull จาก controller  
//router.get('/', controller.getMemberFull);  //เรียกฟังก์ชัน getMemberFull จาก controller (รองรับการส่ง memid ผ่าน query parameter)
router.get('/:id/full', controller.getMemberFull);
//router.get('/:id/proxy', controller.getMemberFullProxy);
    

module.exports = router; // ส่งออก router เพื่อให้สามารถนำไปใช้ใน app.js หรือไฟล์หลักของแอปพลิเคชันได้  