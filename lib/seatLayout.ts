import type { Floor, Room, Seat, SeatSide, Table } from './types';

const SEAT_SPACING = 26;
const SEAT_OFFSET = 14;

export interface RectTableOpts {
  x: number;
  y: number;
  width: number;
  height: number;
  seatsTop?: number;
  seatsBottom?: number;
  seatsLeft?: number;
  seatsRight?: number;
}

export interface RoundTableOpts {
  x: number;
  y: number;
  diameter: number;
  seatCount: number;
}

function makeSideSeats(tableId: string, side: SeatSide, count: number): Seat[] {
  return Array.from({ length: count }, (_, order) => ({
    id: `${tableId}-${side}-${order}`,
    status: 'empty' as const,
    side,
    order,
  }));
}

export function createRectTable(id: string, opts: RectTableOpts): Table {
  const seats = [
    ...makeSideSeats(id, 'top', opts.seatsTop ?? 0),
    ...makeSideSeats(id, 'bottom', opts.seatsBottom ?? 0),
    ...makeSideSeats(id, 'left', opts.seatsLeft ?? 0),
    ...makeSideSeats(id, 'right', opts.seatsRight ?? 0),
  ];

  return {
    id,
    shape: 'rect',
    x: opts.x,
    y: opts.y,
    width: opts.width,
    height: opts.height,
    seats,
  };
}

export function createRoundTable(id: string, opts: RoundTableOpts): Table {
  const seats: Seat[] = Array.from({ length: opts.seatCount }, (_, order) => ({
    id: `${id}-${order}`,
    status: 'empty' as const,
    angle: (360 / opts.seatCount) * order,
    order,
  }));

  return {
    id,
    shape: 'round',
    x: opts.x,
    y: opts.y,
    width: opts.diameter,
    height: opts.diameter,
    seats,
  };
}

function alongSide(count: number, length: number, order: number): number {
  if (count <= 1) {
    return length / 2;
  }

  const spacing = Math.min(SEAT_SPACING, length / (count + 1));
  const total = (count - 1) * spacing;
  const start = (length - total) / 2;
  return start + order * spacing;
}

function rectSeatPosition(table: Table, seat: Seat): { x: number; y: number } {
  const side = seat.side ?? 'top';
  const count = table.seats.filter((item) => item.side === side).length;

  if (side === 'top') {
    return {
      x: table.x + alongSide(count, table.width, seat.order),
      y: table.y - SEAT_OFFSET,
    };
  }

  if (side === 'bottom') {
    return {
      x: table.x + alongSide(count, table.width, seat.order),
      y: table.y + table.height + SEAT_OFFSET,
    };
  }

  if (side === 'left') {
    return {
      x: table.x - SEAT_OFFSET,
      y: table.y + alongSide(count, table.height, seat.order),
    };
  }

  return {
    x: table.x + table.width + SEAT_OFFSET,
    y: table.y + alongSide(count, table.height, seat.order),
  };
}

export function getSeatPosition(table: Table, seat: Seat): { x: number; y: number } {
  if (table.shape === 'round') {
    const cx = table.x + table.width / 2;
    const cy = table.y + table.height / 2;
    const radius = table.width / 2 + SEAT_OFFSET;
    const radians = ((seat.angle ?? 0) * Math.PI) / 180;

    return {
      x: cx + radius * Math.cos(radians),
      y: cy + radius * Math.sin(radians),
    };
  }

  return rectSeatPosition(table, seat);
}

const VIEW_PAD = 20;
export const FLOOR_OUTER_PAD = 12;

export function getFloorViewBox(floor: Floor, focusedRoom?: Room): string {
  if (!focusedRoom) {
    const pad = FLOOR_OUTER_PAD;
    return `${-pad} ${-pad} ${floor.width + pad * 2} ${floor.height + pad * 2}`;
  }

  const x = focusedRoom.x - VIEW_PAD;
  const y = focusedRoom.y - VIEW_PAD;
  const width = focusedRoom.width + VIEW_PAD * 2;
  const height = focusedRoom.height + VIEW_PAD * 2;
  return `${x} ${y} ${width} ${height}`;
}
