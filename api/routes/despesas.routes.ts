import DespesasController from '../controllers/DespesasController';
import { Router } from 'express';

class DespesasRoutes
{
    public routes : Router;

    constructor() {
        this.routes = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.routes.get('/', DespesasController.getAll);
        this.routes.get('/:id', DespesasController.getOne);
        this.routes.post('/', DespesasController.create);
        this.routes.put('/:id', DespesasController.update);
        this.routes.delete('/:id', DespesasController.delete);
    }
}

export default new DespesasRoutes().routes;