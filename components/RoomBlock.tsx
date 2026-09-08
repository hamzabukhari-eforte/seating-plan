'use client';

import type { Room } from '@/lib/types';
import { AmenityMark } from './AmenityMark';
import { RoomLabel } from './RoomLabel';
import { RoomSurface } from './RoomSurface';
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
      <RoomSurface room={room} />
      <RoomLabel room={room} />
      {(room.amenities ?? []).map((amenity) => (
        <AmenityMark key={amenity.id} amenity={amenity} />
      ))}
      {room.tables.map((table) => (
        <TableBlock key={table.id} table={table} roomName={room.name} />
      ))}
    </g>
  );
}
