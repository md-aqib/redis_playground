const { Router } = require("express");
const baseRouter = Router();
const basePath = "/todoapp/user";

const userRoutes = require('../modules/users/routes/ userRoutes');

baseRouter.use("/user", userRoutes);

module.exports = {
    baseRouter,
    basePath
};