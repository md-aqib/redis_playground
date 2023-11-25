const { Router } = require("express");
const baseRouter = Router();
const basePath = "/todoapp/user";

const userRoutes = require('../modules/users/routes/ userRoutes');
const todoRoutes = require('../modules/todos/routes/todoRoutes');
const todoRoutes = require('../modules/transactions/routes/transactionRoutes');

baseRouter.use("/user", userRoutes);
baseRouter.use("/todo", todoRoutes);
baseRouter.use("/transaction", todoRoutes);

module.exports = {
    baseRouter,
    basePath
};