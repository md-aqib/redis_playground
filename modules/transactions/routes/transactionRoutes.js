const { Router } = require('express');
const { verifyToken } = require('../../../helper/authHandler')
const transactionRoutes = Router();
const {
    transferWalletAmount
} = require('../controllers/transactionController');

transactionRoutes.post("/transferwalletamount", verifyToken, transferWalletAmount);

module.exports = transactionRoutes;