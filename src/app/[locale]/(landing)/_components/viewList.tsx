"use client";

import { getOrganizations } from "@/services/organization-service";
import { Organization } from "@/types/organization";
import { useQuery } from "@tanstack/react-query";
import { LoadingBox } from "../../loading";

export default function ViewList(props: { orgs?: Organization[] }) {
  const { orgs } = props;
  const { data, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  if (isLoading) return <LoadingBox />;

  return (
    <ul className="w-full max-w-md space-y-2">
      {data?.map((org) => (
        <li
          key={org.id}
          className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
        >
          <span className="font-medium">{org.name}</span>
          <span className="text-sm text-muted-foreground">/{org.slug}</span>
        </li>
      ))}
    </ul>
  );
}
