import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token for user authentication
 * @param payload The data to include in the token
 * @returns signed JWT string
 */
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

/**
 * Verifies a JSON Web Token
 * @param token The JWT string to verify
 * @returns decoded payload if successful
 */
export const verifyToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.verify(token, secret);
};
