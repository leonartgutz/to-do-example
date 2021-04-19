import { Router } from 'express';
import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import UserSessionController from './controllers/UserSessionController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/create-post', authMiddleware, TodoController.store);

routes.post('/create-user', UserController.store);

routes.post('/login', UserSessionController.store);

export default routes;
