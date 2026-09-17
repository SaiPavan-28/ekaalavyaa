import jwt from 'jsonwebtoken';

const getSecret = () => process.env.JWT_SECRET || 'fallback-secret-for-dev';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, getSecret());
};
