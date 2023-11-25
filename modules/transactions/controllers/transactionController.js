const { transactionModel } = require('../models/transactionModel');

const transferWalletAmount = async (req, res) => {
    try {
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}


module.exports = {
    transferWalletAmount
};