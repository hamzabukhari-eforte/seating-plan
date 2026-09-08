'use client';

export function SeatTooltipMeta({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-[13px] font-medium text-label">
      {label}: <span className="font-semibold text-ink">{value}</span>
    </p>
  );
}
