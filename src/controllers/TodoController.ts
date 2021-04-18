import * as Yup from 'yup';
import Todo from '../models/Todo';

class TodoController {
  async store(req: any, res: any) {
    const schema = Yup.object().shape({
      content: Yup.string().required(),
      date: Yup.string().required(),
      userId: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Content, Date and User Id' });
    }

    await Todo.create(req.body);

    return res.json({ message: 'Created' });
  }
}

export default new TodoController();
