import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { exampleService, ExampleListParams } from "@/services/example.service";
import { ExtendedAxiosRequestConfig } from "@/lib/api-client";

export const exampleKeys = {
  all: ["examples"] as const,
  lists: () => [...exampleKeys.all, "list"] as const,
  list: (params: ExampleListParams) =>
    [...exampleKeys.lists(), params] as const,
  details: () => [...exampleKeys.all, "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

export function useExamples(
  params: ExampleListParams = { page: 1, limit: 10 },
) {
  return useQuery({
    queryKey: exampleKeys.list(params),
    queryFn: () => exampleService.getExamples(params),
    select: (response) => ({
      items: response.data ?? [],
      meta: response.meta,
    }),
  });
}

export function useExample(id: string) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: () => exampleService.getExampleById(id),
    select: (response) => response.data,
    enabled: Boolean(id),
  });
}

export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      config,
    }: {
      data: { title: string; description?: string };
      config?: ExtendedAxiosRequestConfig;
    }) => exampleService.createExample(data, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}

export function useDeleteExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => exampleService.deleteExample(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
