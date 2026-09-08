'use client';

import { useState } from 'react';
import { FLOOR_OUTER_PAD, getFloorViewBox } from '@/lib/seatLayout';
import { theme } from '@/lib/theme';
import type { Floor } from '@/lib/types';
import { RoomBlock } from './RoomBlock';
import { ZoomOutButton } from './ZoomOutButton';

interface FloorPlanProps {
  floor: Floor;
}

export function FloorPlan({ floor }: FloorPlanProps) {
  const [focusedRoomId, setFocusedRoomId] = useState<string | null>(null);
  const room = floor.rooms.find((item) => item.id === focusedRoomId);
  const viewBox = getFloorViewBox(floor, room);
  const pad = FLOOR_OUTER_PAD;

  return (
    <div className="relative mx-auto w-full max-w-[540px]">
      {room ? <ZoomOutButton onClick={() => setFocusedRoomId(null)} /> : null}
      <svg
        viewBox={viewBox}
        className="block h-auto w-full"
        role="img"
        aria-label={`${floor.name} seating plan`}
        onClick={() => setFocusedRoomId(null)}
      >
        <rect
          x={-pad}
          y={-pad}
          width={floor.width + pad * 2}
          height={floor.height + pad * 2}
          fill={theme.page}
        />
        {floor.rooms.map((item) => (
          <RoomBlock key={item.id} room={item} onSelect={() => setFocusedRoomId(item.id)} />
        ))}
      </svg>
    </div>
  );
}
