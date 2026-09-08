import { fillSeats, type SeatFill } from './occupancy';
import { createRectTable, createRoundTable } from './seatLayout';
import type { Amenity, Floor, Room, RoomKind, SeatStatus, Table } from './types';

function room(
  id: string,
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  tables: Table[] = [],
  extras: { kind?: RoomKind; amenities?: Amenity[]; outline?: Room['outline']; hatch?: boolean } = {},
): Room {
  return { id, name, x, y, width, height, tables, ...extras };
}

function mark(id: string, kind: Amenity['kind'], x: number, y: number): Amenity {
  return { id, kind, x, y };
}

const NAMES = [
  'Ahmed Khan', 'Zainab Siddiqui', 'Hassan Raza', 'Fatima Noor', 'Bilal Ahmed',
  'Nimra Aziz', 'Usman Ali', 'Maryam Iqbal', 'Sameer Lodhi', 'Anum Zahra',
  'Haroon Mirza', 'Saba Rehman', 'Aiza Hashmi', 'Shayan Mughal', 'Wania Akram',
  'Iqra Shahid', 'Talha Akhtar', 'Arslan Ashraf', 'Sidra Gul', 'Yusra Amin',
  'Imran Baig', 'Farah Jabeen', 'Laiba Khan', 'Omar Farooq', 'Rabia Hussain',
  'Maham Yousaf', 'Ayesha Malik', 'Danish Anwar', 'Hira Shah', 'Sana Farooq',
];

const PATTERN: SeatStatus[] = [
  'active', 'active', 'empty', 'active', 'break', 'active', 'offline', 'empty', 'active', 'absent',
];

function mix(count: number, seed: number): SeatFill[] {
  return Array.from({ length: count }, (_, index) => {
    const status = PATTERN[(seed + index) % PATTERN.length];
    if (status === 'empty') {
      return { status };
    }
    return { status, agentName: NAMES[(seed + index * 3) % NAMES.length] };
  });
}

// Three column bands, 16 apart, 12 margin either side of the 720 plate.
const L = { x: 12, w: 236 };
const C = { x: 264, w: 192 };
const R = { x: 472, w: 236 };

const DESK_PITCH = 32;
const END_INSET = 24;

interface BenchRow {
  perSide: number;
  end?: 'left' | 'right';
}

/** One shared bench: seats run along both long sides, plus an optional end seat. */
function bench(label: string, x: number, y: number, row: BenchRow, seed: number): Table {
  const left = row.end === 'left' ? 1 : 0;
  const right = row.end === 'right' ? 1 : 0;
  return fillSeats(
    createRectTable(label.toLowerCase(), {
      x,
      y,
      label,
      width: Math.max(56, row.perSide * DESK_PITCH),
      height: 26,
      seatsTop: row.perSide,
      seatsBottom: row.perSide,
      seatsLeft: left,
      seatsRight: right,
    }),
    mix(row.perSide * 2 + left + right, seed),
  );
}

/** Benches stacked down a column, centred in the room and inset where an end seat sits. */
function benches(
  code: string,
  band: { x: number; w: number },
  startY: number,
  step: number,
  rows: BenchRow[],
  firstNo = 1,
): Table[] {
  return rows.map((row, index) => {
    const width = Math.max(56, row.perSide * DESK_PITCH);
    let x = band.x + (band.w - width) / 2;
    if (row.end === 'left') {
      x = Math.max(x, band.x + END_INSET);
    }
    if (row.end === 'right') {
      x = Math.min(x, band.x + band.w - width - END_INSET);
    }
    const label = `${code}-${firstNo + index}`;
    return bench(label, Math.round(x), startY + index * step, row, 20 + index * 7);
  });
}

function deskWithGuests(label: string, x: number, y: number, width: number, name: string): Table {
  return fillSeats(
    createRectTable(label.toLowerCase(), {
      x,
      y,
      label,
      width,
      height: 30,
      seatsTop: 2,
      seatsBottom: 1,
    }),
    [{ status: 'empty' }, { status: 'empty' }, { status: 'active', agentName: name }],
  );
}

export function floor4(): Floor {
  return {
    id: 'floor-4',
    name: '4th Floor',
    width: 720,
    height: 2040,
    rooms: [
      // Entry band.
      room('lounge-top', 'Lounge', L.x, 12, L.w, 168, [], { kind: 'service' }),
      room('stairs-top', 'Stairs / Lifts', C.x, 12, C.w, 168, [], {
        kind: 'service',
        amenities: [
          mark('st-1', 'stairs', 306, 96),
          mark('st-2', 'lift', 404, 76),
          mark('st-3', 'lift', 404, 120),
        ],
      }),
      room('female-1', 'Female Toilet', R.x, 12, R.w, 76, [], { kind: 'service' }),
      room('pantry', 'Pantry', R.x, 96, 64, 84, [], { kind: 'service' }),
      room('male-1', 'Male Toilet', 548, 96, 160, 84, [], { kind: 'service' }),

      // Executive band.
      room('ahu', 'AHU Plant', L.x, 196, L.w, 92, [], { kind: 'service' }),
      room('gm', 'Secretary GM', C.x, 196, C.w, 92, [
        fillSeats(
          createRectTable('gm-1', { x: 312, y: 236, label: 'GM-1', width: 96, height: 26, seatsBottom: 1 }),
          [{ status: 'active', agentName: 'Zainab Siddiqui' }],
        ),
      ]),
      room('checkpost', 'Ladies Checkpost', R.x, 196, R.w, 92, [
        fillSeats(
          createRectTable('lc-1', { x: 542, y: 236, label: 'LC-1', width: 96, height: 26, seatsBottom: 1 }),
          [{ status: 'active', agentName: 'Ahmed Khan' }],
        ),
      ]),

      room('office-1', 'Office 1', L.x, 304, L.w, 108, [
        fillSeats(
          createRectTable('off-1', {
            x: 112,
            y: 330,
            label: 'OFF-1',
            width: 36,
            height: 58,
            seatsLeft: 2,
            seatsRight: 2,
          }),
          mix(4, 2),
        ),
      ]),
      room('office-2', 'Office 2', L.x, 428, L.w, 108, [
        fillSeats(
          createRectTable('off-2', {
            x: 112,
            y: 454,
            label: 'OFF-2',
            width: 36,
            height: 58,
            seatsLeft: 2,
            seatsRight: 2,
          }),
          mix(4, 6),
        ),
      ]),
      room('bano', 'Shar Bano Office', C.x, 304, C.w, 232, [
        deskWithGuests('SB-1', 312, 352, 96, 'Usman Ali'),
        fillSeats(
          createRoundTable('sb-2', { x: 334, y: 448, label: 'SB-2', diameter: 52, seatCount: 4 }),
          mix(4, 11),
        ),
      ], { amenities: [mark('bano-tv', 'tv', 434, 340)] }),
      room('lockers-top', 'Lockers', R.x, 304, R.w, 232, [], {
        kind: 'service',
        amenities: [
          mark('lock-1', 'lockers', 590, 384),
          mark('lock-2', 'lockers', 590, 424),
          mark('lock-3', 'lockers', 590, 464),
        ],
      }),

      // Open office: benches either side of the centre spine.
      room('west', 'Left Workstations', L.x, 548, L.w, 1100,
        benches('LWS', L, 612, 108, [
          { perSide: 4 },
          { perSide: 4 },
          { perSide: 2, end: 'left' },
          { perSide: 3 },
          { perSide: 4 },
          { perSide: 6, end: 'left' },
          { perSide: 6 },
          { perSide: 6 },
          { perSide: 6 },
          { perSide: 6, end: 'left' },
        ]),
      ),

      room('huddle-1', 'Huddle 1', C.x, 548, 92, 112, [], { kind: 'service' }),
      room('huddle-2', 'Huddle 2', 364, 548, 92, 112, [], { kind: 'service' }),
      room('conference', 'Conference', C.x, 676, C.w, 176, [], {
        kind: 'service',
        outline: 'curve-sw',
      }),
      room('breakout', 'Break-out', C.x, 868, C.w, 128, [], { kind: 'service', hatch: true }),
      room('lockers-mid', 'Lockers', C.x, 1012, C.w, 80, [], {
        kind: 'service',
        amenities: [
          mark('lm-1', 'lockers', 312, 1052),
          mark('lm-2', 'lockers', 360, 1052),
          mark('lm-3', 'lockers', 408, 1052),
        ],
      }),

      room('east', 'Right Workstations', R.x, 548, R.w, 760,
        benches('RWS', R, 600, 108, [
          { perSide: 3 },
          { perSide: 3, end: 'right' },
          { perSide: 3 },
          { perSide: 4 },
          { perSide: 4, end: 'right' },
          { perSide: 4 },
          { perSide: 4 },
        ]),
      ),
      room('east-2', 'Right Workstations', R.x, 1328, 140, 160,
        benches('RWS', { x: R.x, w: 140 }, 1392, 108, [{ perSide: 3 }], 8),
      ),
      room('stairs-mid', 'Stairs', 624, 1328, 84, 160, [], {
        kind: 'service',
        amenities: [mark('st-mid', 'stairs', 666, 1408)],
      }),
      room('noc', 'IT NOC', R.x, 1508, R.w, 140,
        benches('NOC', R, 1560, 108, [{ perSide: 6 }]),
      ),

      // Amenity end. Common room and kitchen stay empty; dining seats sit outside them.
      room('common', 'Common Room', L.x, 1680, L.w, 200, [], { kind: 'service' }),
      room('dining', 'Dining', C.x, 1680, C.w, 200, [], { kind: 'service' }),
      room('kitchen', 'Kitchen', R.x, 1680, R.w, 200, [], {
        kind: 'service',
        amenities: [mark('kit-1', 'kitchen', 590, 1786)],
      }),

      room('female-2', 'Female Toilet', L.x, 1900, L.w, 56, [], { kind: 'service' }),
      room('male-2', 'Male Toilet', L.x, 1968, L.w, 56, [], { kind: 'service' }),
      room('stairs-bot', 'Stairs / Lifts', C.x, 1900, C.w, 124, [], {
        kind: 'service',
        amenities: [
          mark('st-b1', 'stairs', 306, 1972),
          mark('st-b2', 'lift', 402, 1950),
          mark('st-b3', 'lift', 402, 1994),
        ],
      }),
      room('lounge-bot', 'Lounge', R.x, 1900, R.w, 70, [], { kind: 'service' }),
      room('lockers-bot', 'Lockers', R.x, 1982, R.w, 42, [], {
        kind: 'service',
        amenities: [mark('lock-b', 'lockers', 590, 2003)],
      }),
    ],
  };
}
