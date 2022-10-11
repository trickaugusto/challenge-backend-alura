import AppError from '../messages/AppError';
import DespesasRepository from '../repositories/DespesasRepository';
import startsWithCapital from '../../utils/startsWithCapital';
import { ICreateExpense, IUpdateExpense } from 'interfaces';

class DespesasService {
    async getAll() {
        return await DespesasRepository.getAll();
    }

    async getAllByDescription(description : string) {
        const response = await DespesasRepository.getAllByDescription(description);

        if (!response || response.length == 0) {
            throw new AppError("Não localizado", 404);
        }

        return response;
    }

    async getOne(id : number) {
        
        const response = await DespesasRepository.getOne(id);
        
        if (!response) {
            throw new AppError("Id não encontrado", 404);
        }

        return response;
    }

    async create(newExpense : ICreateExpense) {
    
        let isValidCategory = -1;
        const typesCategory = ['alimentação', 'saúde', 'moradia', 'transporte', 'educação', 'lazer', 'imprevistos'];
        
        const existExpense = await DespesasRepository.getByParams(newExpense.descricao, newExpense.data);
        
        if (existExpense) {
            throw new AppError("Despesa já foi cadastrada anteriormente", 422);
        }
        
        if (newExpense.categoria) isValidCategory = typesCategory.indexOf(newExpense.categoria.toLowerCase());
        
        if (isValidCategory < 0) {
            newExpense.categoria = 'Outras';
        } else {
            newExpense.categoria = startsWithCapital(newExpense.categoria);
        }
        
        return await DespesasRepository.create(newExpense);
    }

    async update(id : number, newInfo : IUpdateExpense) {
        const exist = await DespesasRepository.getOne(id);
        
        if (!exist) {
            throw new AppError("Id não encontrado", 404);
        }

        if (newInfo.data) newInfo.data = new Date(newInfo.data);

        const updated = {...exist, ...newInfo};
        updated.updatedAt = new Date();
        
        return await DespesasRepository.update(updated);
    }

    async delete(id : number) {

        const exist = await DespesasRepository.getOne(id);
        
        if (!exist) {
            throw new AppError("Id não encontrado", 404);
        }

        return await DespesasRepository.delete(id);
    }
}

export default new DespesasService();