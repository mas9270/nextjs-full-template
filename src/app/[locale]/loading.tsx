"use client";
// src/app/[locale]/loading.tsx
export default function Loading(props: { size?: number }) {
  const { size = 12 } = props;
  return (
    <div className="flex h-screen items-center justify-center">
      <LoadingBox size={size} />
    </div>
  );
}

export function LoadingBox(props: { size?: number }) {
  const { size = 12 } = props;

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-primary h-${size} w-${size}`}
    />
  );
}
