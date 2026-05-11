const { sql, pool } = require('../../../config/db');
// =============================
// CHECK MEMBER EXISTS
// =============================
exports.checkMemberExists = async (memid) => {

    const db = await pool;

    const result = await db.request()
        .input('mem_id', sql.VarChar, memid)
        .query(`
            SELECT mem_id
            FROM mem_h_member
            WHERE mem_id = @mem_id`);

    return result.recordset[0] || null;
};
// =============================
// MEMBER DETAIL
// =============================
exports.getMemberById = async (memid) => {

    const db = await pool;

    const result = await db.request()
        .input('mem_id', sql.VarChar, memid)
        .query(`
            SELECT 
                m.mem_id,
                m.empid,
                p.ptitle_name + ' ' + m.fname + ' ' + m.lname AS fullname,
                m.shortname,
                m.tried_flg,
                m.id_card,
                m.country_code,
                mt.memtype,
                m.section_id,
                m.subsection_id,
                s.status_name,
                m.mem_date,
                m.kasean_date,
                m.tried_date,
                m.dmyretire,
                m.address,
                m.tumbol,
                d.district_name,
                pr.province_name,
                m.zip_code,
                m.pager
            FROM mem_h_member m
            JOIN view_shr_mem_new v ON m.mem_id = v.mem_id
            JOIN mem_m_province pr ON m.province_id = pr.province_id
            JOIN mem_m_district d ON m.district_id = d.district_id 
                AND d.province_id = pr.province_id
            JOIN mem_m_memtype mt ON m.memtype_id = mt.memtype_id
            JOIN mem_m_status s ON m.status_id = s.status_id
            JOIN mem_m_ptitle p ON m.ptitle_id = p.ptitle_id
            WHERE v.shr_sum_bth > 0
            AND m.mem_id = @mem_id
        `);

    return result.recordset[0] || null;
};
