import * as Yup from 'yup';
import User from '../models/User';

class UserSessionController {
  async store(req: any, res: any) {
    const { password } = req.body;

    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().min(8).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Login and a Password with 8 characters minimum' });
    }

    const user = await User.findOne(req.body);

    if (!user) {
      return res.status(401).json({ error: 'No user found' });
    }

    if (!(User.checkPassword(password, user.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return res.json({ message: 'Welcome' });
  }
}

export default new UserSessionController();
