// src/services/organization-service.ts
import type { Organization } from '@/types/organization';
import { mockOrganizations, mockDelay } from '@/mocks/organizations';

/**
 * سرویس سازمان‌ها
 * در حال حاضر از Mock استفاده می‌کند.
 * بعداً می‌توانی داخل همین تابع به axios/API یا DB واقعی وصل شوی.
 */
export async function getOrganizations(): Promise<Organization[]> {
  // شبیه‌سازی درخواست شبکه
  await mockDelay(1500);

  // بعداً:
  // const { data } = await apiClient.get<Organization[]>('/organizations');
  // return data;

  return mockOrganizations;
}

export async function getOrganizationBySlug(
  slug: string
): Promise<Organization | undefined> {
  await mockDelay(200);
  return mockOrganizations.find((org) => org.slug === slug);
}
