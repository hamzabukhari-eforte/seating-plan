'use client';

import type { Room } from '@/lib/types';
import { theme } from '@/lib/theme';
import { TableBlock } from './TableBlock';

interface RoomBlockProps {
  room: Room;
  onSelect: () => void;
}

export function RoomBlock({ room, onSelect }: RoomBlockProps) {
  return (
    <g
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
    >
      <rect
        x={room.x}
        y={room.y}
        width={room.width}
        height={room.height}
        rx={10}
        fill={theme.card}
        stroke={theme.line}
        strokeWidth={1.5}
      />
      <text
        x={room.x + 14}
        y={room.y + 22}
        fill={theme.primary}
        fontSize={12}
        fontWeight={700}
        letterSpacing={0.3}
      >
        {room.name}
      </text>
      {room.tables.map((table) => (
        <TableBlock key={table.id} table={table} roomName={room.name} />
      ))}
    </g>
  );
}
