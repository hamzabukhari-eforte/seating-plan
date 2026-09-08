'use client';

import type { SeatStatus } from '@/lib/types';
import { statusColors, statusLabels } from '@/lib/statusColors';

const statuses = Object.keys(statusColors) as SeatStatus[];

export function StatusLegend() {
  return (
    <ul className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <li
          key={status}
          className="flex items-center gap-1.5 rounded-md border border-line bg-page px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-label"
        >
          <span
            className="inline-block h-2 w-2 rounded-full border border-white"
            style={{ backgroundColor: statusColors[status] }}
          />
          {statusLabels[status]}
        </li>
      ))}
    </ul>
  );
}
