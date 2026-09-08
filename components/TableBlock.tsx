'use client';

import type { Table } from '@/lib/types';
import { getSeatPosition } from '@/lib/seatLayout';
import { Seat } from './Seat';
import { TableShape } from './TableShape';

interface TableBlockProps {
  table: Table;
  roomName: string;
}

export function TableBlock({ table, roomName }: TableBlockProps) {
  return (
    <g>
      <TableShape table={table} />
      {table.seats.map((seat) => {
        const { x, y } = getSeatPosition(table, seat);
        return (
          <Seat
            key={seat.id}
            seat={seat}
            x={x}
            y={y}
            roomName={roomName}
            tableId={table.id}
          />
        );
      })}
    </g>
  );
}
