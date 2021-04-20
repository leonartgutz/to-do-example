import jwt from 'jsonwebtoken';
import authConfig from '../config/token';

const tokenGeneration = (userId: string, login: string): object => {
  const result = {
    userInfo: {
      userId,
      login,
    },
    token: jwt.sign({ userId }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  };

  return result;
};

export default tokenGeneration;
