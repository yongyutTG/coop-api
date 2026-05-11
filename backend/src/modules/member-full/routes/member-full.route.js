const express = require('express');
const router = express.Router();
const controller = require('../controllers/member-full.controller'); // นำเข้า controller เพื่อเรียกใช้ฟังก์ชันต่างๆ  

//router.get('/:memid', controller.getMemberFull);  //เรียกฟังก์ชัน getMemberFull จาก controller  
//router.get('/', controller.getMemberFull);  //เรียกฟังก์ชัน getMemberFull จาก controller (รองรับการส่ง memid ผ่าน query parameter)
// FULL PROFILE
router.get('/:id/full', controller.getMemberFull);


// router.get('/', (req, res) => {
//     return res.status(400).json({
//         status: 'error',
//         message: 'memid is required'
//     });
// });

module.exports = router; // ส่งออก router เพื่อให้สามารถนำไปใช้ใน app.js หรือไฟล์หลักของแอปพลิเคชันได้  