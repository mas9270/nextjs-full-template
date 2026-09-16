export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  message?: string;
  errors?: Record<string, string[]> | null;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string[]>;

  constructor(statusCode: number, message: string, errors?: Record<string, string[]>) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
