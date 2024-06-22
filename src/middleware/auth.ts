import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
// import { CustomRequest } from '../types/custom';
// import { jwtVerify } from 'jose';

// Load environment variables from .env file
dotenv.config();

const prisma = new PrismaClient();
const jwtSecret: string = process.env.JWT_SECRET || '';


export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};

export const generateToken = (user: { id: number; email: string }): string => {
  return jwt.sign({ userId: user.id, email: user.email }, jwtSecret, { expiresIn: '1h' });
};

interface JwtPayload {
  userId: number;
  email: string;
}

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, jwtSecret) as JwtPayload;
  } catch (error) {
    return null;
  }
};

// Middleware to authenticate JWT token
// export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.token;
//   console.log('Token received:', token);  // Debugging statement

//   if (!token) {
//     return res.status(401).send('Access denied');
//   }

//   try {
//     const { payload } = await jwtVerify(token, jwtSecret);
//     console.log('Token payload:', payload);  // Debugging statement
//     const user = await prisma.user.findUnique({ where: { id: payload.userId } });
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     console.error('Invalid token', error);  // Debugging statement
//     res.status(400).send('Invalid token');
//   }
// };