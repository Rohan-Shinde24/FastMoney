import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  // Define routes that require authentication
  const protectedRoutes = ['/api/protected', '/api/user', '/dashboard', '/profile'];
  
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    const authHeader = request.headers.get('authorization');
    const cookieToken = request.cookies.get('token')?.value;
    
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (cookieToken) {
      token = cookieToken;
    }

    if (!token) {
      // If it's an API request, return JSON. Otherwise redirect to login.
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { message: 'Authentication required. Token is missing.' },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('JWT_SECRET is missing');
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    }

    try {
      // Verify token using jose (Next.js Edge runtime compatible)
      const encoder = new TextEncoder();
      const { payload } = await jwtVerify(token, encoder.encode(secret));
      
      // Optionally attach user info to headers to use in route handlers
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.id as string);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      if (request.nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.json(
          { message: 'Invalid or expired token' },
          { status: 401 }
        );
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    '/api/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};

