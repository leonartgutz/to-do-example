import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import mongoose from 'mongoose';
import routes from './routes';

class App {
  server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.dbConnect();
  }

  middlewares() {
    this.server.use(json());
    this.server.use(cookieParser());
  }

  routes() {
    this.server.use(routes);
  }

  async dbConnect() {
    await mongoose.connect('mongodb://localhost:27017/Todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new App().server;
