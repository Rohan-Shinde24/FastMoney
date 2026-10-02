"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginValidation } from '@/validation/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(loginValidation),
    mode: 'onTouched',
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await axios.post('/api/auth/login', data);
      if (response.data.token) {
        const token = response.data.token.replace('Bearer ', '');
        localStorage.setItem('token', response.data.token);
        document.cookie = `token=${token}; path=/; max-age=604800; samesite=strict`; // 7 days
        router.push('/dashboard');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-(--bg-color)">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 border border-(--border-color)">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-(--primary-color) mb-2">Welcome Back</h2>
          <p className="text-(--text-muted)">Sign in to your earning dashboard.</p>
        </div>

        {serverError && (
          <div className="p-3 rounded-lg bg-red-50 text-(--error-color) text-sm border border-red-200 text-center">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 text-sm text-(--text-main) cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" />
              Remember me
            </label>
            <a href="#" className="text-sm font-medium text-(--primary-color) hover:underline">
              Forgot Password?
            </a>
          </div>

          <Button type="submit" fullWidth disabled={isLoading} className="mt-6">
            {isLoading ? 'Signing In...' : 'Log In'}
          </Button>
        </form>

        <p className="text-center text-sm text-(--text-muted)">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-(--secondary-color) hover:text-(--secondary-hover) transition-colors">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}