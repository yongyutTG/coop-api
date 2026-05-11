async function searchMember() {

    const memid = document.getElementById('memid').value;

    if (!memid) {
        alert('กรุณากรอกรหัสสมาชิก');
        return;
    }

    try {

       const response = await fetch(
            `http://localhost:3000/api/members/${memid}/full`,{
                
                method: 'GET',
                headers: {
                    'x-api-key': ';y=irLNg,Tu34TT4t4t'
                }
            }
        );

        const result = await response.json();

        if (result.status !== 'success') {

            document.getElementById('result').innerHTML = `
                <p style="color:red;">
                    ${result.message}
                </p>
            `;

            return;
        }

        const data = result.data;

        renderMember(data);

    } catch (err) {

        console.error(err);

        document.getElementById('result').innerHTML = `
            <p style="color:red;">
                Error calling API
            </p>
        `;
    }
}


function renderMember(data) {

    let html = '';

    // MEMBER
    html += `
        <div class="card">
            <h3>ข้อมูลสมาชิก</h3>

            <p>
                <b>รหัสสมาชิก:</b>
                ${data.member.mem_id}
            </p>

            <p>
                <b>ชื่อ:</b>
                ${data.member.fullname}
            </p>

            <p>
                <b>เลขบัตร:</b>
                ${data.member.id_card}
            </p>
        </div>
    `;


    // SAVING
    html += `
        <div class="card">

            <h3>บัญชีเงินฝาก</h3>

            <table>
                <tr>
                    <th>เลขบัญชี</th>
                    <th>ประเภท</th>
                    <th>ยอดเงิน</th>
                </tr>
    `;

    data.savingAccounts.forEach(item => {

        html += `
            <tr>
                <td>${item.account_no}</td>
                <td>${item.acc_desc}</td>
                <td>${item.balance}</td>
            </tr>
        `;
    });

    html += `
            </table>
        </div>
    `;


    // LOANS
    html += `
        <div class="card">

            <h3>เงินกู้</h3>

            <table>
                <tr>
                    <th>เลขสัญญา</th>
                    <th>ประเภท</th>
                    <th>ยอดเงิน</th>
                </tr>
    `;

    data.loans.forEach(item => {

        html += `
            <tr>
                <td>${item.lcont_id}</td>
                <td>${item.l_type_code}</td>
                <td>${item.lcont_amount_sal}</td>
            </tr>
        `;
    });

    html += `
            </table>
        </div>
    `;


    // STOCKS
    html += `
        <div class="card">

            <h3>หุ้น</h3>

            <table>
                <tr>
                    <th>หุ้น</th>
                    <th>มูลค่า</th>
                </tr>
    `;

    data.stocks.forEach(item => {

        html += `
            <tr>
                <td>${item.shr_sum_shr}</td>
                <td>${item.shr_sum_bth}</td>
            </tr>
        `;
    });

    html += `
            </table>
        </div>
    `;


    document.getElementById('result').innerHTML = html;
}