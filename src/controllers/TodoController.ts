import * as Yup from 'yup';
import Todo from '../models/Todo';

class TodoController {
  async store(req: any, res: any) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      date: Yup.string().required(),
      user: Yup.object().shape({
        userId: Yup.string().required(),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Content, Date and User Id' });
    }

    await Todo.create(req.body);

    return res.json({ message: 'Created' });
  }

  async index(req: any, res: any) {
    const result = await Todo.getAll(req.query.date, req.query.search, req.query.done);

    return res.json(result);
  }
}

export default new TodoController();
