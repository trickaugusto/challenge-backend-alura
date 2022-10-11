// Arquivo principal das rotas
import { Router } from 'express';
import despesasRoutes from './despesas.routes';
import receitasRoutes from './receitas.routes';

class Routes 
{
    public routes : Router;
    
    constructor() {
        this.routes = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.routes.use('/despesas', despesasRoutes);
        this.routes.use('/recipes', receitasRoutes);
    }
}

export default new Routes().routes;