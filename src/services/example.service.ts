import { http, ExtendedAxiosRequestConfig } from '@/lib/api-client';

export interface Example {
  _id: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExampleListParams {
  page?: number;
  limit?: number;
}

export const exampleService = {
  getExamples: (params?: ExampleListParams, config?: ExtendedAxiosRequestConfig) =>
    http.get<Example[]>('/examples', { params, ...config }),

  getExampleById: (id: string) =>
    http.get<Example>(`/examples/${id}`),

  createExample: (
    payload: { title: string; description?: string },
    config?: ExtendedAxiosRequestConfig
  ) => http.post<Example>('/examples', payload, config),

  deleteExample: (id: string) =>
    http.delete<{ id: string }>(`/examples/${id}`),
};
