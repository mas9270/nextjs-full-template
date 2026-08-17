// src/types/organization.ts
export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

// تایپ عمومی برای خروجی‌های API/سرویس در آینده
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}
