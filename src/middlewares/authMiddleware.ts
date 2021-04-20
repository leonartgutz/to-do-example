import jwt from 'jsonwebtoken';
import authConfig from '../config/token';

export default async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    jwt.verify(token, authConfig.secret, {}, (_: any, decoded: any) => {
      req.body.userId = decoded.userId;
    });

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' });
  }
};
