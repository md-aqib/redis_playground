const { Router } = require("express");
const baseRouter = Router();
const basePath = "/todoapp/user";

const userRoutes = require('../modules/users/routes/ userRoutes');
const todoRoutes = require('../modules/todos/routes/todoRoutes')

baseRouter.use("/user", userRoutes);
baseRouter.use("/todo", todoRoutes);

module.exports = {
    baseRouter,
    basePath
};