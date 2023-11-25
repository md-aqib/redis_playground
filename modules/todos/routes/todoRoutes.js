const todoRoutes = require('express').Router();
const { verifyToken } = require('../../../helper/authHandler')
const { cacheMiddleware } = require('../controllers/todoMiddleware')
const {
    updateTodo,
    todoList,
    todoDetails
} = require('../controllers/todoController')

todoRoutes.post('/updatetodo', verifyToken, updateTodo);
todoRoutes.get('/todolist', verifyToken, cacheMiddleware, todoList);
todoRoutes.get('/tododetails', verifyToken, todoDetails);

module.exports = todoRoutes;