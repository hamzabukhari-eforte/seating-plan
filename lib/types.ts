export type SeatStatus = 'active' | 'absent' | 'break' | 'offline' | 'empty';

export type SeatSide = 'top' | 'bottom' | 'left' | 'right';

export interface Seat {
  id: string;
  status: SeatStatus;
  agentName?: string;
  side?: SeatSide;
  angle?: number;
  order: number;
}

export interface Table {
  id: string;
  shape: 'rect' | 'round';
  x: number;
  y: number;
  width: number;
  height: number;
  seats: Seat[];
}

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tables: Table[];
}

export interface Floor {
  id: string;
  name: string;
  width: number;
  height: number;
  rooms: Room[];
}
