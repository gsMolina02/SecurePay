const Sentry = require('@sentry/node');

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

      // Disparador de error operacional: simula fallo de conexión a la base de datos
      throw new Error("Conexión interrumpida con el Clúster de Datos SecurePay");

    } catch (error) {
      Sentry.withScope((scope) => {
        scope.setTag('user_id', req.user?.sub || 'anonymous');
        Sentry.captureException(error);
      });

      return res.status(500).json({
        error: 'Error operacional',
        message: error.message
      });
    }
  }
}

module.exports = TransferController;
