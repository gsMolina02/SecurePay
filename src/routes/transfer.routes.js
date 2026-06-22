const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

const accountRepository = require('../services/account.repository');
const financialValidationService = require('../services/financial.validation.service');
const notificationService = require('../services/notification.service');
const TransactionService = require('../services/transaction.monolith.service');
const TransferController = require('../controllers/transfer.controller');

const transactionService = new TransactionService(accountRepository, financialValidationService, notificationService);
const transferController = new TransferController(transactionService);

// POST /v1/transfer-beta/execute
router.post('/execute', authMiddleware, (req, res) => transferController.executeTransfer(req, res));

module.exports = router;
