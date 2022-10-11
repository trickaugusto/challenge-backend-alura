import ReceitasController from '../controllers/ReceitasControler';
import { Router } from 'express';

class ReceitasRoutes
{
    public routes : Router;

    constructor() {
        this.routes = Router();
        this.createRoutes();
    }

    createRoutes() {
        this.routes.get('/', ReceitasController.getAll);
        this.routes.get('/:id', ReceitasController.getOne);
        this.routes.post('/', ReceitasController.create);
        this.routes.put('/:id', ReceitasController.update);
        this.routes.delete('/:id', ReceitasController.delete);
    }
}

export default new ReceitasRoutes().routes;