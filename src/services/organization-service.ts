import type { Organization } from "@/types/organization";
import { mockOrganizations, mockDelay } from "@/mocks/organizations";

export async function getOrganizations(): Promise<Organization[]> {
  await mockDelay(3000);

  return mockOrganizations;
}
