'use client';

import type { Room } from '@/lib/types';
import { theme } from '@/lib/theme';

export function RoomSurface({ room }: { room: Room }) {
  const fill = room.hatch ? `url(#hatch-${room.id})` : room.kind === 'service' ? theme.page : theme.card;
  const { x, y, width, height } = room;

  return (
    <g>
      {room.hatch ? (
        <defs>
          <pattern id={`hatch-${room.id}`} width={20} height={20} patternUnits="userSpaceOnUse">
            <rect width={20} height={20} fill={theme.page} />
            <path d="M20 0 V20 H0" fill="none" stroke={theme.line} strokeWidth={1} />
          </pattern>
        </defs>
      ) : null}
      {room.outline === 'curve-sw' ? (
        <path
          d={`M ${x} ${y} H ${x + width} V ${y + height} H ${x + 36} Q ${x} ${y + height * 0.58} ${x} ${y} Z`}
          fill={fill}
          stroke={theme.line}
          strokeWidth={1.5}
        />
      ) : (
        <rect x={x} y={y} width={width} height={height} rx={10} fill={fill} stroke={theme.line} strokeWidth={1.5} />
      )}
    </g>
  );
}
