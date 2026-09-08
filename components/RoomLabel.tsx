'use client';

import type { Room } from '@/lib/types';
import { theme } from '@/lib/theme';

export function RoomLabel({ room }: { room: Room }) {
  return (
    <text
      x={room.x + 10}
      y={room.y + 18}
      fill={theme.primary}
      fontSize={11}
      fontWeight={700}
      letterSpacing={0.2}
    >
      {room.name}
    </text>
  );
}
