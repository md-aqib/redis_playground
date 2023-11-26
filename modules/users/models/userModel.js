const { Types, model, Schema } = require('mongoose');

const userSchema = new Schema({
    userId: { type: Types.ObjectId, auto: true },
    name: String,
    email: String,
    password: String,
    profilePic: String,
    mobile: String,
    isLogin: { type: Boolean, default: false },
    walletBal: { type: Number, default: 0 },
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

userSchema.index({ email: 1 });

const userModel = model('Users', userSchema);

module.exports = { userModel }