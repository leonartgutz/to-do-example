import { Router } from 'express';
import TodoController from './controllers/TodoController';

const routes = Router();

routes.post('/create', TodoController.store);

export default routes;
