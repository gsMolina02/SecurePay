class FinancialValidationService {
  validateTransfer(sender, fromAccountId, receiver, toAccountId, amount) {
    if (!sender) {
      throw new Error(`Error de validación: La cuenta origen '${fromAccountId}' no existe en la base de datos.`);
    }
    if (!receiver) {
      throw new Error(`Error de validación: La cuenta destino '${toAccountId}' no existe en la base de datos.`);
    }
    if (amount <= 0) {
      throw new Error('Error de validación: El monto a transferir debe ser mayor a cero.');
    }
    if (sender.balance < amount) {
      throw new Error(`Saldo insuficiente: La cuenta '${fromAccountId}' tiene $${sender.balance}, requiere $${amount}.`);
    }
  }

  validateAccountExists(account, accountId) {
    if (!account) {
      throw new Error(`La cuenta '${accountId}' no existe.`);
    }
  }
}

module.exports = new FinancialValidationService();
