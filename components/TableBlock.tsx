'use client';

import type { Table } from '@/lib/types';
import { getSeatPosition } from '@/lib/seatLayout';
import { Seat } from './Seat';
import { TableLabel } from './TableLabel';
import { TableShape } from './TableShape';

interface TableBlockProps {
  table: Table;
  roomName: string;
}

export function TableBlock({ table, roomName }: TableBlockProps) {
  return (
    <g>
      <TableShape table={table} />
      <TableLabel table={table} />
      {table.seats.map((seat, index) => {
        const { x, y } = getSeatPosition(table, seat);
        return (
          <Seat
            key={seat.id}
            seat={seat}
            x={x}
            y={y}
            roomName={roomName}
            tableLabel={table.label ?? table.id}
            seatNo={index + 1}
          />
        );
      })}
    </g>
  );
}
