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
            WHERE mem_id = @mem_id
        `);

    return result.recordset[0] || null;
};


// =============================
// MEMBER by memid full DETAIL
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
                v.shr_sum_bth,
                v.shr_sum_bth / 10 AS shr_amount,
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


// =============================
// SAVING
// =============================
exports.getSavingAccounts = async (memid) => {

    const db = await pool;

    const result = await db.request()
        .input('mem_id', sql.VarChar, memid)
        .query(`
            SELECT 
                sa.account_no,
                sa.balance,
                sa.available,
                at.acc_desc
            FROM bk_h_savingaccount sa
            JOIN bk_m_acc_type at 
                ON sa.acc_type = at.acc_type
            WHERE sa.mem_id = @mem_id
            AND sa.acc_status = 'O'
        `);

    return result.recordset;
};


// =============================
// LOANS
// =============================
exports.getLoans = async (memid) => {

    const db = await pool;

    const result = await db.request()
        .input('mem_id', sql.VarChar, memid)
        .query(`
            SELECT 
                lcont_id,
                br_no,
                l_type_code,
                lcont_sal_date,
                lcont_paysal,
                lcont_max_install,
                lcont_sal,
                lcont_amount_sal,
                lcont_amount_inst,
                lcont_status_flag,
                mem_id,
                lcont_approve_sal,
                lcont_status_cont,
                lcont_pay_last_date,
                code,
                plus_interest,
                refinance_no,
                remark,
                '' AS ls_date,
                0.00 AS inte_cal,
                0.00 AS total_loan,
                lcont_pay_flag,
                0.00 AS inte_not_enough
            FROM loan_m_contact
            WHERE mem_id = @mem_id
            AND lcont_status_flag <> '4'
            ORDER BY lcont_id ASC
        `);

    return result.recordset;
};


// =============================
// STOCK
// =============================
exports.getStocks = async (memid) => {

    const db = await pool;

    const result = await db.request()
        .input('mem_id', sql.VarChar, memid)
        .query(`
            SELECT 
                shr_sum_shr,
                shr_sum_bth,
                outstanding
            FROM shr_mem
            WHERE mem_id = @mem_id
        `);

    return result.recordset;
};