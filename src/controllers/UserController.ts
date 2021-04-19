import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req: any, res: any) {
    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().min(8).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Login and a Password with 8 characters minimum' });
    }

    if (!(await User.create(req.body))) {
      return res.status(401).json({ error: 'There is already a User with this login' });
    }

    return res.json({ message: 'Created' });
  }
}

export default new UserController();
