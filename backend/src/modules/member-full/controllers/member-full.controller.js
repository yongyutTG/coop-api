const memberService = require('../services/member-full.service');  // นำเข้า service เพื่อเรียกใช้ฟังก์ชันต่างๆ   

//ส่งออกฟังก์ชัน getMemberFull เพื่อให้สามารถเรียกใช้ใน route ได้
// exports.getMemberFull = async (req, res) => {
//     try {
//         const memid = req.params.memid; // รับ memid จาก URL parameter
//        // const memid = req.query.id; // รับ memid จาก query parameter   
//         if (!memid) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'กรุณาระบุ memid'
//             });
//         }
        
//         if (!/^\d+$/.test(memid)) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'ต้องเป็นตัวเลขเท่านั้น'
//             });
//         }
//         if (memid.length !== 6) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'memid ต้อง 6 หลัก'
//             });
//         }

//         const data = await memberService.getMemberFull(memid);// เรียกใช้ฟังก์ชัน getMemberFull จาก service  
        
//         if (!data) {
//             return res.status(404).json({
//                 status: 'error',
//                 message: 'ไม่พบข้อมูล'
//             });
//         }
//         return res.status(200).json({
//             status: 'success',
//             data
//         });

//     } catch (err) {
//         return res.status(500).json({
//             status: 'error',
//             message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
//         });
//     }
// };

exports.getMemberFull = async (req, res) => {
    try {
        const id = req.params.id; // ใช้ตัวแปรชัดเจน
        // ตรวจสอบก่อนเรียก service
        if (!/^\d+$/.test(id)) {
            console.log('Received memid:', id); // Debug log
            return res.status(400).json({
                status: 'error',
                message: 'ต้องเป็นตัวเลขเท่านั้น'
            });
        }
        if (id.length !== 6) {
            return res.status(400).json({
                status: 'error',
                message: 'memid ต้อง 6 หลัก'
            });
        }
        // เรียก service หลัง validation ผ่าน
        const memid = await memberService.getMemberFull(id);
        if (!memid) {
            return res.status(404).json({
                status: 'error',
                message: 'ไม่พบข้อมูล'
            });
        }
        return res.json({
            status: 'success',
            data: memid
        });
    } catch (err) {
        return res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};