"use client";

import { useState } from "react";
import { useExamples, useCreateExample, useDeleteExample } from "@/hooks/queries/use-example";

export function ExampleListView() {
  const [title, setTitle] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const { data, isLoading, isError, error } = useExamples({ page: 1, limit: 10 });
  const createMutation = useCreateExample();
  const deleteMutation = useDeleteExample();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    createMutation.mutate(
      {
        data: { title },
        config: {
          onUploadProgress: (progressEvent) => {
            const percent = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 0;
            setUploadProgress(percent);
          },
        },
      },
      {
        onSuccess: () => {
          setTitle("");
          setUploadProgress(null);
        },
        onError: () => {
          setUploadProgress(null);
        },
      }
    );
  };

  if (isLoading) {
    return <div className="p-4">در حال بارگذاری اطلاعات...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">خطا: {error?.message}</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <form onSubmit={handleCreate} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان جدید..."
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {createMutation.isPending ? "در حال ارسال..." : "افزودن آیتم"}
        </button>

        {uploadProgress !== null && (
          <div className="w-full bg-gray-200 rounded h-2">
            <div
              className="bg-blue-600 h-2 rounded transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </form>

      <ul className="divide-y border rounded">
        {data?.items.map((item) => (
          <li key={item._id} className="p-3 flex justify-between items-center">
            <span>{item.title}</span>
            <button
              onClick={() => deleteMutation.mutate(item._id)}
              disabled={deleteMutation.isPending}
              className="text-red-500 text-sm hover:underline"
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
