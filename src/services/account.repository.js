const usersDb = [
  { id: 'usr_001', email: 'estudiante.alpha@espe.edu.ec', accountAlpha: 'ACC-12345', balance: 1500.00 },
  { id: 'usr_002', email: 'docente.beta@espe.edu.ec', accountAlpha: 'ACC-67890', balance: 350.50 }
];

const transactionsHistory = [];

class AccountRepository {
  findByAccountId(accountId) {
    return usersDb.find(u => u.accountAlpha === accountId) || null;
  }

  applyTransfer(sender, receiver, amount) {
    sender.balance -= amount;
    receiver.balance += amount;
  }

  saveTransaction(transaction) {
    transactionsHistory.push(transaction);
  }

  getTransactionsHistory() {
    return [...transactionsHistory];
  }
}

module.exports = new AccountRepository();
