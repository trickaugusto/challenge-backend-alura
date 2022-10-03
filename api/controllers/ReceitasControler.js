const { restart } = require('nodemon');
const database = require('../models'); //vai pra pasta e procura o index

class ReceitaController {
    static async getAllRecipes(req, res) {
        try {
            const allRecipes = await database.Receitas.findAll();

            return res.status(200).json(allRecipes);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneRecipe(req, res) {
        const { id } = req.params;

        try {
            const recipe = await database.Receitas.findOne({ where: {id: Number(id)}});

            if (!recipe) return res.status(404).send("Id não encontrado");

            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async createRecipe(req, res) {
        const newRecipe = req.body;

        try {

            const existRecipe = await database.Receitas.findOne( {
                where: {
                    descricao: newRecipe.descricao,
                    data: newRecipe.data
                }}
            );

            if (existRecipe) return res.status(409).send("Receita já foi cadastrada anteriormente");

            const newRecipeCreated = await database.Receitas.create(newRecipe);
            console.log(`Nova receita criada com id ${newRecipeCreated.id}`)

            return res.status(201).send("Criado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateRecipe(req, res) {
        const { id } = req.params;
        const newInfo = req.body;

        try {
            const update = await database.Receitas.update(newInfo, {where: {id: Number(id)}});

            if (update == 0) return res.status(400).send("Receita não encontrada");

            return res.status(204).send("Atualizado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteRecipe(req, res) {
        const { id } = req.params;

        try {
            const result = await database.Receitas.destroy({where: {id: Number(id)}});

            if ( result == 0 ) return res.status(400).send("Receita não encontrada");

            return res.status(204).send("Deletado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ReceitaController;