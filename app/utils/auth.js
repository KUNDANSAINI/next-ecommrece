import jwt from 'jsonwebtoken';
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRAT_KEY;

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};


export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};