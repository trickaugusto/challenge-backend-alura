import { Receitas } from "@prisma/client";
import { ICreateRecipe, IUpdateRecipe } from "interfaces";
import prisma from "../prisma";

class ReceitasRepository {
    async getAll() {
        return await prisma.receitas.findMany();
    }

    async getAllByDescription(description : string) {
        return await prisma.receitas.findMany({ where: { 
                descricao: {contains: description}
            }
        });
    }

    async getOne(id : number) {
        return await prisma.receitas.findFirst({ where: {id}});
    }

    async getByParams(descricao : string, data : Date) {
        return await prisma.receitas.findFirst( {
            where: {
                descricao: descricao,
                data: data
            }}
        );
    }

    async create(newRecipe : ICreateRecipe) {
        return await prisma.receitas.create({
            data: newRecipe
        });
    }

    async update(data : Receitas) {
        return await prisma.receitas.update({
            where: {
                id: data.id
            },
            data
        });
    }

    async delete(id : number) {
        return await prisma.receitas.delete({
            where: {
                id: id
            }
        });
    }
}

export default new ReceitasRepository();