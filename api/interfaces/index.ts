export interface ICreateExpense {
    descricao : string;
    valor : number;
    data : Date;
    categoria?: string
}

export interface IUpdateExpense {
    descricao ?: string;
    valor ?: number;
    data ?: Date;
    categoria?: string
}

export interface ICreateRecipe {
    descricao : string;
    valor : number;
    data : Date;
}

export interface IUpdateRecipe {
    descricao ?: string;
    valor ?: number;
    data ?: Date;
}