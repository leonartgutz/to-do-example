import { Router } from 'express';
import TodoController from './controllers/TodoController';
import UserController from './controllers/UserController';
import UserSessionController from './controllers/UserSessionController';
import authMiddleware from './middlewares/authMiddleware';

const routes = Router();

routes.post('/post', authMiddleware, TodoController.store);
routes.get('/posts', TodoController.index);
routes.put('/post', authMiddleware, TodoController.update);
routes.delete('/post', authMiddleware, TodoController.delete);

routes.post('/user', UserController.store);

routes.post('/login', UserSessionController.store);

export default routes;
