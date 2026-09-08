'use client';

import type { Seat as SeatModel } from '@/lib/types';
import { statusColors } from '@/lib/statusColors';
import { theme } from '@/lib/theme';
import { useSeatTooltipActions } from './SeatTooltipContext';

interface SeatProps {
  seat: SeatModel;
  x: number;
  y: number;
  roomName: string;
  tableId: string;
}

const RADIUS = 9;

export function Seat({ seat, x, y, roomName, tableId }: SeatProps) {
  const { show, hide } = useSeatTooltipActions();
  const payload = { seat, roomName, tableId };

  return (
    <circle
      cx={x}
      cy={y}
      r={RADIUS}
      fill={statusColors[seat.status]}
      stroke={theme.card}
      strokeWidth={1.5}
      className="cursor-pointer transition-[filter,stroke-width] hover:stroke-primary"
      style={{ filter: 'drop-shadow(0 1px 1px rgba(15, 23, 42, 0.12))' }}
      onMouseEnter={(event) => show({ ...payload, x: event.clientX, y: event.clientY })}
      onMouseMove={(event) => show({ ...payload, x: event.clientX, y: event.clientY })}
      onMouseLeave={hide}
    />
  );
}
