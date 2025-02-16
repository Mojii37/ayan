// src/utils/security.ts
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(password, hashedPassword);
};

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};
