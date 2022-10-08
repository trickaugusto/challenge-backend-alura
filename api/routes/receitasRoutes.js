const { Router } = require('express');
const ReceitasController = require('../controllers/ReceitasControler');

const router = Router();

router.get('/recipes', ReceitasController.getAll);
router.get('/recipes/:id', ReceitasController.getOne);
router.post('/recipes', ReceitasController.create);
router.put('/recipes/:id', ReceitasController.update);
router.delete('/recipes/:id', ReceitasController.delete);

module.exports = router;