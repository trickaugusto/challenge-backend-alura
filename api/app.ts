import express, { Express, NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from './messages/AppError';
import routes from './routes';

class App 
{
    public server : Express;

    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(routes);
        this.exceptionHandler();
    }

    exceptionHandler() {
        this.server.use(async (err : Error, req : Request, res : Response, next : NextFunction) => {
            if (err instanceof AppError) {
                return res.status(err.statusCode).json({ status: 'error', message: err.message });
            }
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'homolog') {
                return res.status(409).json({ status: false, message: 'Internal Server Error', error: err });
            }
            return res.status(500).json({ status: false, message: 'Internal Server Error' });
        });
    }
}

export default new App().server;