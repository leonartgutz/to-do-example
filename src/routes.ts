import { Router } from 'express';
import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';

const routes = Router();

routes.post('/create-post', TodoController.store);

routes.post('/create-user', UserController.store);

export default routes;
