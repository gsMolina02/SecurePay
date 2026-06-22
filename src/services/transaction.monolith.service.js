class TransactionService {
  constructor(accountRepository, financialValidationService, notificationService) {
    this.accountRepository = accountRepository;
    this.financialValidationService = financialValidationService;
    this.notificationService = notificationService;
  }

  executeTransfer(fromAccountId, toAccountId, amount) {
    const sender = this.accountRepository.findByAccountId(fromAccountId);
    const receiver = this.accountRepository.findByAccountId(toAccountId);

    this.financialValidationService.validateTransfer(sender, fromAccountId, receiver, toAccountId, amount);

    this.accountRepository.applyTransfer(sender, receiver, amount);

    const newTransaction = {
      transactionId: `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      from: fromAccountId,
      to: toAccountId,
      amount,
      status: 'COMPLETED',
      timestamp: new Date().toISOString()
    };
    this.accountRepository.saveTransaction(newTransaction);

    this.notificationService.notifyTransfer(sender, receiver, fromAccountId, amount);

    return {
      success: true,
      message: 'Transferencia ejecutada con éxito',
      transaction: newTransaction,
      balanceRestante: sender.balance
    };
  }

  getAccountBalance(accountId) {
    const account = this.accountRepository.findByAccountId(accountId);
    this.financialValidationService.validateAccountExists(account, accountId);
    return {
      accountId: account.accountAlpha,
      email: account.email,
      balance: account.balance
    };
  }
}

module.exports = TransactionService;
