const { Router } = require('express');
const DespesasController = require('../controllers/DespesasController.js');

const router = Router();

router.get('/expense', DespesasController.getAllExpense);
router.get('/expense/:id', DespesasController.getOneExpense);
router.post('/expense', DespesasController.createExpense);
router.put('/expense/:id', DespesasController.updateExpense);
router.delete('/expense/:id', DespesasController.deleteExpense);

module.exports = router;