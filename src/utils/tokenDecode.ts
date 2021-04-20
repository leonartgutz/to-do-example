import jwt from 'jsonwebtoken';
import authConfig from '../config/token';

const tokenDecode = (reqCookie: any): string => {
  const auth: any = jwt.verify(reqCookie['graph-cookie'], authConfig.secret);

  const { userId } = auth;

  return userId;
};

export default tokenDecode;
