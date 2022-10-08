const { Router } = require('express');
const DespesasController = require('../controllers/DespesasController.js');

const router = Router();

router.get('/expense', DespesasController.getAll);
router.get('/expense/:id', DespesasController.getOne);
router.post('/expense', DespesasController.create);
router.put('/expense/:id', DespesasController.update);
router.delete('/expense/:id', DespesasController.delete);

module.exports = router;