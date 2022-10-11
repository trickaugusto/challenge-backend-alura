import { Despesas } from '@prisma/client';
import { Request, Response } from 'express';
import DespesasService from '../services/DespesasService';
import AppError from '../messages/AppError';

class DespesasController {
    async getAll(req : Request, res : Response) {
        const { description } = req.query

        let response : Despesas[];

        if (description) {
            response = await DespesasService.getAllByDescription(String(description));
        } else {
            response = await DespesasService.getAll();
        }

        return res.status(200).json(response);
    }

    async getOne(req : Request, res : Response) {
        const { id } = req.params;
        const response = await DespesasService.getOne(+id); // converte pra Number

        return res.json(response);
    }

    async create(req : Request, res : Response) {
        const newExpense = req.body;

        if (!newExpense.descricao || !newExpense.valor || !newExpense.data) {
            throw new AppError("Todas as informações precisam estar preenchidas (descricao, valor e data)");
        }

        newExpense.data = new Date(newExpense.data);

        await DespesasService.create(newExpense);
        return res.status(201).end();
    }

    async update(req : Request, res : Response) {
        const { id } = req.params;
        const newInfo = req.body;

        await DespesasService.update(+id, newInfo);

        return res.status(202).end();
    }

    async delete(req : Request, res : Response) {
        const { id } = req.params;
        await DespesasService.delete(+id) 

        return res.status(204).end();
    }
}

export default new DespesasController();