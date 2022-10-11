import { ICreateRecipe, IUpdateRecipe } from 'interfaces';
import AppError from '../messages/AppError';
import ReceitasRepository from '../repositories/ReceitasRepository';

class ReceitasService {
    async getAll() {
        return await ReceitasRepository.getAll();
    }

    async getAllByDescription(description : string) {
        const response = await ReceitasRepository.getAllByDescription(description);

        if (!response || response.length == 0) {
            throw new AppError("Não localizado", 404);
        }

        return response;
    }

    async getOne(id : number) {
        
        const response = await ReceitasRepository.getOne(id);
        
        if (!response) {
            throw new AppError("Id não encontrado", 404);
        }

        return response;
    }

    async create(newRecipe : ICreateRecipe) {
        const existExpense = await ReceitasRepository.getByParams(newRecipe.descricao, newRecipe.data);

        if (existExpense) {
            throw new AppError("Receita já foi cadastrada anteriormente", 422);
        }

        return await ReceitasRepository.create(newRecipe);
    }

    async update(id: number, newInfo: IUpdateRecipe) {
        const exist = await ReceitasRepository.getOne(id);
        
        if (!exist) {
            throw new AppError("Id não encontrado", 404);
        }

        if (newInfo.data) newInfo.data = new Date(newInfo.data);

        const updated = {...exist, ...newInfo};
        updated.updatedAt = new Date();

        return await ReceitasRepository.update(updated);
    }

    async delete(id : number) {
        const exist = await ReceitasRepository.getOne(id);
        
        if (!exist) {
            throw new AppError("Id não encontrado", 404);
        }

        return await ReceitasRepository.delete(id);
    }
}

export default new ReceitasService();