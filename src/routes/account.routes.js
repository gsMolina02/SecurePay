const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const accountRepository = require('../services/account.repository');
const financialValidationService = require('../services/financial.validation.service');
const notificationService = require('../services/notification.service');
const TransactionService = require('../services/transaction.monolith.service');
const AccountController = require('../controllers/account.controller');

const transactionService = new TransactionService(accountRepository, financialValidationService, notificationService);
const accountController = new AccountController(transactionService);

// GET /v1/account-alpha/balance
router.get('/balance', authMiddleware, (req, res) => accountController.getBalance(req, res));

module.exports = router;
