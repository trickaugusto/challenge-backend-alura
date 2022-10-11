import AppError from '../messages/AppError';
import { Receitas } from '@prisma/client';
import { Request, Response } from 'express';
import ReceitasService from '../services/ReceitasService';

class ReceitasController {
    async getAll(req : Request, res : Response) {
        const { description } = req.query

        let response : Receitas[];

        if (description) {
            response = await ReceitasService.getAllByDescription(String(description));
        } else {
            response = await ReceitasService.getAll();
        }

        return res.status(200).json(response);
    }

    async getOne(req : Request, res : Response) {
        const { id } = req.params;
        const response = await ReceitasService.getOne(+id); // converte pra Number

        return res.json(response);
    }

    async create(req : Request, res : Response) {
        const newRecipe = req.body;

        if (!newRecipe.descricao || !newRecipe.valor || !newRecipe.data) {
            throw new AppError("Todas as informações precisam estar preenchidas (descricao, valor e data)");
        }

        newRecipe.data = new Date(newRecipe.data);

        await ReceitasService.create(newRecipe);
        return res.status(201).end();
    }

    async update(req : Request, res : Response) {
        const { id } = req.params;
        const newInfo = req.body;

        await ReceitasService.update(+id, newInfo);

        return res.status(202).end();
    }

    async delete(req : Request, res : Response) {
        const { id } = req.params;
        await ReceitasService.delete(+id) 

        return res.status(204).end();
    }
}

export default new ReceitasController();