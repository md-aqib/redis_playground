const { transactionModel } = require('../models/transactionModel');
const { userModel } = require('../../users/models/userModel')

const transferWalletAmount = async (req, res) => {
  const session = await userModel.startSession();
    try {
      const { userId, amount, type } = req.body;
      let fromUserId = req.decoded.userId;
      session.startTransaction();
      const fromUserBal = await userModel.findOne({ userId: fromUserId, walletBal: {$gte: +amount } });
      if(!fromUserBal) {
        return res.json({
          meta: { msg: "Insufficient Wallet Balance", status: false }
        })
      };
      const opts = { new: true, session };
      const updateFromUser = await userModel.findOneAndUpdate(
        { userId: fromUserId },
        { $inc: { walletBal: -amount } },
        opts
      );
      const updateToUser = await userModel.findOneAndUpdate(
        { userId: userId },
        { $inc: { walletBal: -amount } },
        opts
      );                 
      if(updateFromUser && updateToUser) {
        await transactionModel( //createFromUserTransaction
          {
            userId: userId,
            name: updateFromUser.name,
            email: updateFromUser.email,
            currentBal: updateFromUser.currentBal,
            amount: amount,
            type: "Wallet Debit",
            status: "Success"
          }).save(opts);
  
        await transactionModel( //createToUserTransaction
          {
            userId: userId,
            name: updateToUser.name,
            email: updateToUser.email,
            currentBal: updateToUser.currentBal,
            amount: amount,
            type: "Wallet Credit",
            status: "Success"
          }).save(opts);

          await session.commitTransaction();
          session.endSession();
          return res.json({
            meta: { msg: "Amount transferred successfully", status: true }
          })
      };

      await transactionModel( //createFromUserTransaction
      {
        userId: userId,
        name: updateFromUser.name,
        email: updateFromUser.email,
        currentBal: updateFromUser.currentBal,
        amount: amount,
        type: "Wallet Debit",
        status: "Failed"
      }).save(opts);

    await transactionModel( //createToUserTransaction
      {
        userId: userId,
        name: updateToUser.name,
        email: updateToUser.email,
        currentBal: updateToUser.currentBal,
        amount: amount,
        type: "Wallet Credit",
        status: "Failed"
      }).save(opts);
      await session.abortTransaction();
      session.endSession();
      return res.json({
        meta: { msg: "Transaction failed", status: false }
      });
    } catch (error) {
      // If an error occurred, abort the whole transaction and
      // undo any changes that might have happened
      console.log(error)
      await session.abortTransaction();
      session.endSession();
      throw error; 
    }
}


module.exports = {
    transferWalletAmount
};