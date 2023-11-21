const { Types, model, Schema } = require('mongoose');

const userSchema = new Schema({
    userId: { type: Types.ObjectId(), auto: true },
    name: String,
    email: String,
    password: String,
    profilePic: String,
    mobile: String,
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

userSchema.index({ email: 1 });

const userModel = model('Users', userSchema);

module.exports = { userModel }