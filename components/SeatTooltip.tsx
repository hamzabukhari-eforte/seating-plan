'use client';

import { statusColors, statusLabels } from '@/lib/statusColors';
import { clampTooltipPosition } from '@/lib/tooltipPosition';
import { useSeatTooltipPayload } from './SeatTooltipContext';
import { SeatTooltipMeta } from './SeatTooltipMeta';

export function SeatTooltip() {
  const payload = useSeatTooltipPayload();
  if (!payload) return null;

  const { seat, roomName, tableLabel, seatNo, x, y } = payload;
  const { left, top } = clampTooltipPosition(x, y);
  const color = statusColors[seat.status];

  return (
    <div
      className="pointer-events-none fixed z-50 min-w-[168px] rounded-[10px] border border-line bg-card px-3 py-2.5 shadow-[0_4px_6px_-1px_rgba(15,23,42,0.06),0_12px_24px_-4px_rgba(15,23,42,0.12)]"
      style={{ left, top }}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-sm shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
          style={{ backgroundColor: color }}
        />
        <p className="text-sm font-semibold tracking-tight text-ink">
          {seat.agentName ?? 'Unassigned'}
        </p>
      </div>
      <SeatTooltipMeta label="Status" value={statusLabels[seat.status]} />
      <SeatTooltipMeta label="Room" value={roomName} />
      <SeatTooltipMeta label="Table" value={tableLabel} />
      <SeatTooltipMeta label="Seat" value={String(seatNo)} />
      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-page">
        <div className="h-full w-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}
