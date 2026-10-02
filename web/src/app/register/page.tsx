"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerValidation } from '@/validation/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(registerValidation),
    mode: 'onTouched',
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await axios.post('/api/auth/register', data);
      if (response.status === 201 || response.data) {
        // Redirect to login page after successful registration
        router.push('/login');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-(--bg-color)">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 border border-(--border-color)">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-(--primary-color) mb-2">Create Account</h2>
          <p className="text-(--text-muted)">Join to start earning today.</p>
        </div>

        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 text-(--error-color) text-sm border border-red-200 text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            {...register('name')}
            error={errors.name?.message as string}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            {...register('email')}
            error={errors.email?.message as string}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            error={errors.password?.message as string}
          />
          <p className="text-xs text-(--text-muted) leading-relaxed">
            Password must contain at least 6 characters, one uppercase letter, and one special character.
          </p>

          <Button type="submit" fullWidth disabled={isLoading} className="mt-6">
            {isLoading ? 'Creating Account...' : 'Register Now'}
          </Button>
        </form>

        <p className="text-center text-sm text-(--text-muted)">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-(--secondary-color) hover:text-(--secondary-hover) transition-colors">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}