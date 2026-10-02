import { NextResponse } from 'next/server';
import argon2 from 'argon2';
import { generateToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import userModel from '@/models/userModel';
import { loginValidation } from '@/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error, value } = loginValidation.validate(body);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const { email, password } = value;

    await dbConnect();

    const user = await userModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        token: `Bearer ${token}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
