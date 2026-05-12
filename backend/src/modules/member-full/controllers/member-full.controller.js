const memberService = require('../services/member-full.service');  // นำเข้า service เพื่อเรียกใช้ฟังก์ชันต่างๆ   

exports.getMemberFull = async (req, res) => {
    try {
        const id = req.params.id;

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

// exports.getMemberFullProxy = async (req, res) => {
//     try {
//         const id = req.params.id;
//         console.log('getMemberFullProxy called with id:', id); // DEBUG
        
//         // ตรวจสอบ
//         if (!/^\d+$/.test(id) || id.length !== 6) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'ข้อมูลไม่ถูกต้อง'
//             });
//         }

//         // Backend ใช้ API key ที่ซ่อนไว้
//         const response = await fetch(
//             `http://localhost:3000/api/members/${id}/full`,
//             {
//                 method: 'GET',
//                 headers: {
//                     'x-api-key': '123TGsaving'
//                 }
//             }
//         );

//         const data = await response.json();
//         res.json(data);

//     } catch (err) {
//         res.status(500).json({
//             status: 'error',
//             message: err.message
//         });
//     }
// };