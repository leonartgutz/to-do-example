import * as Yup from 'yup';

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

    return res.json({ Done: 'Yes' });
  }
}

export default new TodoController();
