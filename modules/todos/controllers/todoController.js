const { Types } = require('mongoose')
const { todoModel } = require('../models/todoModel');
const { client } = require('../../../client')

const updateTodo = async (req, res) => {
    try {
        const { todo, todoId } = req.body;
        const { userId } = req.decoded; 
        if(!todo) {
            return res.json({
                meta: { msg: "Missing Parameter", status: false }
            })
        };
        const findTodo = await todoModel.findOne({ todo });
        if(!todoId && findTodo) {
            return res.json({
                meta: { msg: "Todo already exists", status: false }
            })
        };
        if(todoId) {
            const updateData = await todoModel.findOneAndUpdate(
                { todoId: Types.ObjectId(todoId) },
                { $set: { todo } },
                { new: true }
            );
            return res.json({
                meta: { msg: "Todo updated successfully", status: true },
                data: updateData
            })
        };
        let saveObj = {
            todo,
            userId
        }
        const saveData = await new todoModel(saveObj).save();
        /* delete cached data */
        let key = "/todoapp/user/todo/todolist:*";
        let keys = await client.keys(key);
        await client.del(keys)
        /* delete cached data */
        return res.json({
            meta: { msg: "Todo saved successfully", status: true },
            data: saveData
        })
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

const todoList = async (req, res) => {
    try {
        const { page, resPerPage, status } = req.body;
        if(!page || !resPerPage) {
            return res.json({
                meta: { msg: "Missing Parameter", status: false }
            })
        };
        let query = {
            ...status && { status }
        }
        const list = await todoModel.find(query)
            .sort({ createdAt: -1 })
            .limit(+resPerPage)
            .skip((+resPerPage * +page) - +resPerPage);
        if(!list.length) {
            return res.json({
                meta: { msg: "Data not found", status: false },
            });
        };
        const count = await todoModel.countDocuments(query);

        if(!req.cached) {
            const key = `${req.originalUrl}:${page}`;
            await client.set(key, JSON.stringify({
                data: list,
                count,
                totalPages: Math.ceil(count / +resPerPage)
            }));
            await client.expire(key, '1000') //in secs
        };

        return res.json({
            meta: { msg: "List found successfully", status: true },
            data: list,
            count,
            totalPages: Math.ceil(count / +resPerPage)
        })
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

const todoDetails = async (req, res) => {
    try {
        const { todoId } = req.query;
        if(!todoId) {
            return res.json({
                meta: { msg: "Missing Parameter", status: false }
            })
        };
        let query = {
            todoId: Types.ObjectId(todoId)
        };
        const details = await todoModel.findOne(query);
        if(!details) {
            return res.json({
                meta: { msg: "Data not found", status: false },
            });
        };
        return res.json({
            meta: { msg: "Data found successfully", status: true },
            data: details
        });
    } catch(e) {
        return res.json({
            meta: { msg: e.message, status: false }
        })
    }
}

module.exports = {
    updateTodo,
    todoList,
    todoDetails
};