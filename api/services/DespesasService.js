const database = require('../models');

class DespesasService {
    static async getAll() {
        try {
            const allExpense = await database.Despesas.findAll();

            return allExpense;
        } catch (error) {
            throw new Error(`Erro ao pegar todas as despesas ${error.message}`);
        }
    }

    static async getOne(id) {
        try {
            const expense = await database.Despesas.findOne({ where: {id: Number(id)}});

            return expense;
        } catch (error) {
            throw new Error(`Erro ao pegar uma despesa ${error.message}`);
        }
    }

    static async create(newExpense) {
        try {

            if (!newExpense.descricao || !newExpense.valor || !newExpense.data) return 400;

            const existExpense = await database.Despesas.findOne( {
                where: {
                    descricao: newExpense.descricao,
                    data: newExpense.data
                }}
            );

            if (existExpense) return 422;

            const newExpenseCreated = await database.Despesas.create(newExpense);
            console.log(`Nova despesa criada com id ${newExpenseCreated.id}`)

            return newExpenseCreated;
        } catch (error) {
            throw new Error(`Erro ao criar uma despesa ${error.message}`);
        }
    }

    static async update(id, newInfo) {
        try {
            const update = await database.Despesas.update(newInfo, {where: {id: Number(id)}});

            return update;
        } catch (error) {
            throw new Error(`Erro ao atualizar uma despesa ${error.message}`);
        }
    }

    static async delete(id) {
        try {
            const result = await database.Despesas.destroy({where: {id: Number(id)}});

            return result;
        } catch (error) {
            throw new Error(`Erro ao deletar uma despesa ${error.message}`);
        }
    }
}

module.exports = DespesasService;