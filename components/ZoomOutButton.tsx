'use client';

export function ZoomOutButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-2 top-2 z-10 rounded-md border border-line bg-card px-2.5 py-1 text-xs font-semibold text-primary shadow-sm transition-colors hover:bg-primary-subtle"
    >
      Back to floor
    </button>
  );
}
