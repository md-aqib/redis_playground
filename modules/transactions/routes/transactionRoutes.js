const { Router } = require('express');
const transactionRoutes = Router();
const {
} = require('../controllers/transactionController');

transactionRoutes.post("/");

module.exports = transactionRoutes;