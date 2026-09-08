import type { SeatStatus, Table } from './types';

export type SeatFill = { status: SeatStatus; agentName?: string };

export function fillSeats(table: Table, fills: SeatFill[]): Table {
  return {
    ...table,
    seats: table.seats.map((seat, index) => {
      const fill = fills[index];
      return fill ? { ...seat, ...fill } : seat;
    }),
  };
}
