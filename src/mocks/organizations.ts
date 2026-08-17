// src/mocks/organizations.ts
import type { Organization } from '@/types/organization';

export const mockOrganizations: Organization[] = [
  {
    id: 'org_1',
    name: 'شرکت آلفا',
    slug: 'alpha',
    createdAt: '2026-01-10T08:00:00Z',
    updatedAt: '2026-08-01T12:30:00Z',
  },
  {
    id: 'org_2',
    name: 'استودیو بتا',
    slug: 'beta-studio',
    createdAt: '2026-02-15T09:20:00Z',
    updatedAt: '2026-07-28T10:00:00Z',
  },
  {
    id: 'org_3',
    name: 'تیم گاما',
    slug: 'gamma-team',
    createdAt: '2026-03-05T11:45:00Z',
    updatedAt: '2026-08-10T14:15:00Z',
  },
];

// شبیه‌سازی تأخیر شبکه برای اینکه تجربه‌ی واقعی‌تر باشد
export const mockDelay = (ms = 1500) =>
  new Promise((resolve) => setTimeout(resolve, ms));
