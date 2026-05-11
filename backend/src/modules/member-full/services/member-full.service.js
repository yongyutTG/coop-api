const memberFullRepo = require('../repositories/member-full.repo');
const logger = require('../../../utils/logger');

exports.getMemberFull = async (memid) => {
    // validate
    if (!memid) {
        throw new Error('memid is required');
    }
    const exists = await memberFullRepo.checkMemberExists(memid);
    if (!exists) {
        return null;
    }
    // query parallel
    const [
        member,
        savingAccounts,
        loans,
        stocks
    ] = await Promise.all([
        memberFullRepo.getMemberById(memid),
        memberFullRepo.getSavingAccounts(memid),
        memberFullRepo.getLoans(memid),
        memberFullRepo.getStocks(memid)
    ]);
    return {
        member,
        savingAccounts,
        loans,
        stocks
    };
};