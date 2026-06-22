class TransferController {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  executeTransfer(req, res) {
    try {
      const { fromAccountId, toAccountId, amount } = req.body;

      if (!fromAccountId || !toAccountId || amount === undefined) {
        return res.status(400).json({
          error: 'Petición incorrecta',
          message: 'Los campos fromAccountId, toAccountId y amount son requeridos en el cuerpo de la petición.'
        });
      }

      const result = this.transactionService.executeTransfer(fromAccountId, toAccountId, Number(amount));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json({
        error: 'Error en la transacción',
        message: error.message
      });
    }
  }
}

module.exports = TransferController;
