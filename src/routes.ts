import { Router } from 'express';
import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import UserSessionController from './controllers/UserSessionController';

const routes = Router();

routes.post('/create-post', TodoController.store);

routes.post('/create-user', UserController.store);
routes.post('/login', UserSessionController.store);

export default routes;
