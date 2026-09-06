"use client";

import { getOrganizations } from "@/services/organization-service";
import { Organization } from "@/types/organization";
import { useQuery } from "@tanstack/react-query";

import { ErrorState } from "@/components/ui/errorState";
import LoadingBox from "@/components/ui/loadingBox";

export default function ViewList(props: { orgs?: Organization[] }) {
  const {} = props;
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
    staleTime: 0,
  });

  console.log(data, error, isPending);

  if (isPending) {
    return <LoadingBox />;
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        reset={() => refetch()}
        title="خطا در دریافت لیست سازمان‌ها"
      />
    );
  }

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
