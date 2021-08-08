import jwt from 'jsonwebtoken';

export const createJwtToken = (data: any): string => {
  return jwt.sign({ data }, process.env.JWT_SECRET_KEY || 'qwerty', {
    expiresIn: '30 days',
    algorithm: 'HS256',
  });
};
