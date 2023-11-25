const { Types, model, Schema } = require('mongoose');

const transactionSchema = new Schema({
    userId: { type: Types.ObjectId, auto: true },
    name: String,
    email: String,
    currentBal: Number,
    type: { type: String, enum: ["WALLET-TRANSFER"], default: "" },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

transactionSchema.index({ email: 1 });

const transactionModel = model('Transactions', transactionSchema);

module.exports = { transactionModel }