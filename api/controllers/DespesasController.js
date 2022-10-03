const { restart } = require('nodemon');
const database = require('../models'); //vai pra pasta e procura o index

class DespesasController {
    static async getAllExpense(req, res) {
        try {
            const allExpense = await database.Despesas.findAll();

            return res.status(200).json(allExpense);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async getOneExpense(req, res) {
        const { id } = req.params;

        try {
            const expense = await database.Despesas.findOne({ where: {id: Number(id)}});

            if (!expense) return res.status(404).send("Id não encontrado");

            return res.status(200).json(expense);
        } catch (error) {
            return res.status(500).json(error.message);
        }

    }

    static async createExpense(req, res) {
        const newExpense = req.body;

        try {

            if (!newExpense.descricao || !newExpense.valor || !newExpense.data) return res.status(400).send("Todas as informações precisam estar preenchidas (descricao, valor e data)");

            const existExpense = await database.Despesas.findOne( {
                where: {
                    descricao: newExpense.descricao,
                    data: newExpense.data
                }}
            );

            if (existExpense) return res.status(422).send("Despesa já foi cadastrada anteriormente");

            const newExpenseCreated = await database.Despesas.create(newExpense);
            console.log(`Nova despesa criada com id ${newExpenseCreated.id}`)

            return res.status(201).send("Criado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async updateExpense(req, res) {
        const { id } = req.params;
        const newInfo = req.body;

        try {
            const update = await database.Despesas.update(newInfo, {where: {id: Number(id)}});

            if (update == 0) return res.status(400).send("Despesa não encontrada");

            return res.status(204).send("Atualizado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deleteExpense(req, res) {
        const { id } = req.params;

        try {
            const result = await database.Despesas.destroy({where: {id: Number(id)}});

            if ( result == 0 ) return res.status(400).send("Despesa não encontrada");

            return res.status(204).send("Deletado");
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = DespesasController;