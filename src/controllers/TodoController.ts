import * as Yup from 'yup';
import Todo from '../repositories/Todo';

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

  async show(req: any, res: any) {
    const result = await Todo.getOne(req.query.id);

    return res.json(result);
  }

  async update(req: any, res: any) {
    const { id } = req.query;

    if (id === '') {
      return res.status(401).json({ error: 'You must provide a post Id' });
    }

    const todo = await Todo.getOne(id);

    if (todo!.userId !== req.body.user.userId) {
      return res.status(401).json({ error: 'You are not the owner of this post' });
    }

    const schema = Yup.object().shape({
      content: Yup.string().required(),
      date: Yup.string().required(),
      done: Yup.bool().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Content, Date and User Id' });
    }

    await Todo.update(id, req.body);

    return res.json({ message: 'Updated' });
  }

  async delete(req: any, res: any) {
    const { id } = req.query;

    if (id === '') {
      return res.status(401).json({ error: 'You must provide a post Id' });
    }

    const todo = await Todo.getOne(id);

    if (todo!.userId !== req.body.user.userId) {
      return res.status(401).json({ error: 'You are not the owner of this post' });
    }

    await Todo.delete(id);

    return res.json({ message: 'Deleted' });
  }
}

export default new TodoController();
