import { Despesas } from "@prisma/client";
import { ICreateExpense, IUpdateExpense } from "interfaces";
import prisma from "../prisma";

class DespesasRepository {
    async getAll() {
        return await prisma.despesas.findMany();
    }

    async getAllByDescription(description : string) {
        return await prisma.despesas.findMany({ where: { 
                descricao: {contains: description}
            }
        });
    }

    async getOne(id : number) {
        return await prisma.despesas.findFirst({ where: {id}});
    }

    async getByParams(descricao : string, data : Date) {

        return await prisma.despesas.findFirst( {
            where: {
                descricao: descricao,
                data: data
            }}
        );
    }

    async create(newExpense : ICreateExpense) {
        return await prisma.despesas.create({
            data: newExpense
        });
    }

    async update(data : Despesas) {

        return await prisma.despesas.update({
            where: {
                id: data.id
            },
            data // data: data
        });
    }

    async delete(id : number) {
        return await prisma.despesas.delete({
            where: {
                id: id
            }
        });
    }
}

export default new DespesasRepository();