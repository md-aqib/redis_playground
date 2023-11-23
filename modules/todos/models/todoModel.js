const { Types, model, Schema } = require('mongoose');

const todoSchema = new Schema({
    todoId: { type: Types.ObjectId, auto: true },
    userId: { type: Types.ObjectId, ref: 'Users'},
    userName: String,
    todo: String,
    status: { type: String, enum: ["Pending", "Completed"], default: "Pending"},
    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

todoSchema.index({ userId: 1 })
const todoModel = model('Todos', todoSchema);

module.exports = { todoModel }