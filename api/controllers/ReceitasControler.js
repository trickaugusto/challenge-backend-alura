const { restart } = require('nodemon');
const database = require('../models'); //vai pra pasta e procura o index
const ReceitasService = require('../services/ReceitasService.js');

class ReceitasController {
    static async getAll(req, res) {
        try {
            const response = await ReceitasService.getAll();

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOne(req, res) {
        const { id } = req.params;

        try {
            const response = await ReceitasService.getOne(id);

            if (!response) return res.status(404).send("Id não encontrado");

            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async create(req, res) {
        const newRecipe = req.body;

        try {

            const response = await ReceitasService.create(newRecipe);

            if (response == 400) return res.status(400).send("Todas as informações precisam estar preenchidas (descricao, valor e data)");

            if (response == 422) return res.status(422).send("Receita já foi cadastrada anteriormente");

            return res.status(201).send("Criado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async update(req, res) {
        const { id } = req.params;
        const newInfo = req.body;

        try {
            const response = await ReceitasService.update(id, newInfo);

            if (response == 0) return res.status(400).send("Receita não encontrada");

            return res.status(204).send("Atualizado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async delete(req, res) {
        const { id } = req.params;

        try {
            const response = await ReceitasService.delete(id);

            if ( response == 0 ) return res.status(400).send("Receita não encontrada");

            return res.status(204).send("Deletado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ReceitasController;