const { Router } = require('express');
const ReceitaController = require('../controllers/ReceitasControler');

const router = Router();

router.get('/recipes', ReceitaController.getAllRecipes);
router.get('/recipes/:id', ReceitaController.getOneRecipe);
router.post('/recipes', ReceitaController.createRecipe);
router.put('/recipes/:id', ReceitaController.updateRecipe);
router.delete('/recipes/:id', ReceitaController.deleteRecipe);

module.exports = router;