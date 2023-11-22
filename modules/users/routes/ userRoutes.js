const { Router } = require('express');
const userRoutes = Router()
const {
    register,
    login
} = require('../controllers/userController')

userRoutes.post("/register", register);
userRoutes.post("/login", login);

module.exports = userRoutes;