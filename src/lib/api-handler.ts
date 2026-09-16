import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError, ApiResponse } from '@/types/api';

export function handleApiSuccess<T>(data: T, message?: string, meta?: ApiResponse['meta'], status = 200) {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
    meta,
  };
  return NextResponse.json(response, { status });
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of error.issues) {
      const path = issue.path.join('.');
      if (!fieldErrors[path]) fieldErrors[path] = [];
      fieldErrors[path].push(issue.message);
    }
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: 'Validation Error',
      errors: fieldErrors,
    };
    return NextResponse.json(response, { status: 422 });
  }

  if (error instanceof ApiError) {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: error.message,
      errors: error.errors,
    };
    return NextResponse.json(response, { status: error.statusCode });
  }

  const response: ApiResponse<null> = {
    success: false,
    data: null,
    message: error instanceof Error ? error.message : 'Internal Server Error',
  };
  return NextResponse.json(response, { status: 500 });
}
