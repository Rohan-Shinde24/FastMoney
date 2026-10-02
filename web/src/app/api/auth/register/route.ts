import { NextResponse } from 'next/server';
import argon2 from 'argon2';
import { generateToken } from '@/lib/jwt';
import dbConnect from '@/lib/mongodb';
import userModel from '@/models/userModel';
import { registerValidation } from '@/validation/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error, value } = registerValidation.validate(body);
    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = value;

    await dbConnect();

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password using argon2
    const hashedPassword = await argon2.hash(password);

    // Create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        token: `Bearer ${token}`,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
