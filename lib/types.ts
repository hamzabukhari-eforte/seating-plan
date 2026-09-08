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
  /** Short code drawn on the table, e.g. `LWS-1`. */
  label?: string;
  shape: 'rect' | 'round' | 'sofa';
  x: number;
  y: number;
  width: number;
  height: number;
  seats: Seat[];
}

export type RoomKind = 'work' | 'service';

export type AmenityKind =
  | 'stairs'
  | 'lift'
  | 'toilet'
  | 'lockers'
  | 'pantry'
  | 'plant'
  | 'tv'
  | 'vending'
  | 'kitchen'
  | 'stall'
  | 'urinal'
  | 'basin';

export interface Amenity {
  id: string;
  kind: AmenityKind;
  x: number;
  y: number;
}

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  tables: Table[];
  kind?: RoomKind;
  amenities?: Amenity[];
  outline?: 'rect' | 'curve-sw';
  hatch?: boolean;
}

export interface Floor {
  id: string;
  name: string;
  width: number;
  height: number;
  rooms: Room[];
}
