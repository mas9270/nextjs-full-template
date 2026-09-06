"use client"
export default function LoadingBox({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="animate-spin rounded-full border-b-2 border-primary"
    />
  );
}
