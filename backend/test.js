const { pool } = require('./src/config/db');

(async () => {
    try {
        const db = await pool;

        const result = await db.request()
            .query("select * from mem_h_member where mem_id = '038036'");

        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ');
        console.log(result.recordset);

    } catch (err) {
        console.error('ไม่สามารถเชื่อมต่อฐานข้อมูลได้:', err.message || err);
        if (err.originalError) {
            console.error('รายละเอียดเพิ่มเติม:', err.originalError.message || err.originalError);
        }
        process.exit(1);
        
    }
})();