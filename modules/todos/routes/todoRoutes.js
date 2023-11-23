const todoRoutes = require('express').Router();
const {
    updateTodo,
    todoList,
    todoDetails
} = require('../controllers/todoController')

todoRoutes.post('/updatetodo', updateTodo)

module.exports = todoRoutes;