const database = require('../models');

class ReceitasService {
    static async getAll(req) {
        const { descricao } = req.query;

        try {
            if (descricao) return this.getAllByDescription(descricao);

            const allRecipes = await database.Receitas.findAll();

            return allRecipes;
        } catch (error) {
            throw new Error(`Erro ao pegar todas as receitas: ${error.message}`);
        }
    }

    static async getAllByDescription(descricao) {
        try {
            const { Op } = require("sequelize");

            // doc https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
            const allRecipes = await database.Receitas.findAll({ where: { descricao: { [Op.substring]: descricao } } });

            return allRecipes;
        } catch (error) {
            throw new Error(`Erro ao pegar todas as receitas: ${error.message}`);
        }
    }

    static async getOne(id) {
        try {
            const recipe = await database.Receitas.findOne({ where: {id: Number(id)}});

            return recipe;
        } catch (error) {
            throw new Error(`Erro ao pegar uma receita: ${error.message}`);
        }
    }

    static async create(newRecipe) {
        try {

            if (!newRecipe.descricao || !newRecipe.valor || !newRecipe.data) return 400;

            const existRecipe = await database.Receitas.findOne( {
                where: {
                    descricao: newRecipe.descricao,
                    data: newRecipe.data
                }}
            );

            if (existRecipe) return 422;

            const newRecipeCreated = await database.Receitas.create(newRecipe);
            console.log(`Nova receita criada com id ${newRecipeCreated.id}`)

            return newRecipeCreated;
        } catch (error) {
            throw new Error(`Erro ao criar uma receita: ${error.message}`);
        }
    }

    static async update(id, newInfo) {
        try {
            const update = await database.Receitas.update(newInfo, {where: {id: Number(id)}});

            return update;
        } catch (error) {
            throw new Error(`Erro ao atualizar uma receita: ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const result = await database.Receitas.destroy({where: {id: Number(id)}});

            return result;
        } catch (error) {
            throw new Error(`Erro ao deletar uma receita ${error.message}`);
        }
    }
}

module.exports = ReceitasService;