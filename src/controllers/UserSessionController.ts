import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../repositories/User';
import authConfig from '../config/token';

class UserSessionController {
  async store(req: any, res: any) {
    const { password } = req.body;

    const schema = Yup.object().shape({
      login: Yup.string().required(),
      password: Yup.string().min(8).required(),
    });

    // Check body validation
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'You must provide: Login and a Password with 8 characters minimum' });
    }

    // Find a user using login
    const user = await User.findOne(req.body);

    // If user not found, send error
    if (!user) {
      return res.status(401).json({ error: 'No user found' });
    }

    // If password not match, send error
    if (!(User.checkPassword(password, user.password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return res.json({
      userInfo: {
        userId: user.id,
        login: user.login,
      },
      token: jwt.sign({ userId: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new UserSessionController();
