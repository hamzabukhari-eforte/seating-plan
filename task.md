Build a static, client-side-only office seating dashboard inside my existing Next.js 16 project (App Router, TypeScript, Tailwind CSS already set up). This will be deployed as a static export (`output: 'export'` in next.config, "out" folder) — no server components that need a server, no API routes, no server actions. Everything runs in the browser using local state and static/mock JSON data.

## Feature overview

A visual, 2D top-down office floor plan viewer, similar in spirit to a cinema seat map or airplane seat selector, but for office seating:

- Multiple **floors** (switchable via tabs).
- Each floor has multiple **rooms**, laid out as rectangles positioned on the floor plan.
- Each room contains one or more **tables**.
- Each table has **seats** arranged around it (top/bottom/left/right for rectangular tables, evenly spaced around the perimeter for round tables).
- Each seat has a **status**: `active`, `absent`, `break`, `offline`, or `empty` (unassigned), each with a distinct color.
- Hovering a seat shows a tooltip with the agent's name, status, and room/table info.
- Clicking a room zooms/focuses into that room (optional stretch feature — implement if straightforward).

## Data model

Create `lib/types.ts`:

```ts
export type SeatStatus = 'active' | 'absent' | 'break' | 'offline' | 'empty';

export type SeatSide = 'top' | 'bottom' | 'left' | 'right';

export interface Seat {
  id: string;
  status: SeatStatus;
  agentName?: string;
  side?: SeatSide;   // for rect tables
  angle?: number;    // for round tables, degrees 0-360
  order: number;     // position index along a side
}

export interface Table {
  id: string;
  shape: 'rect' | 'round';
  x: number;
  y: number;
  width: number;
  height: number;    // for round tables, width === height (diameter)
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
```

## Auto-layout helpers

Create `lib/seatLayout.ts` with helper functions so I don't have to hand-place every seat's coordinates:

- `createRectTable(id: string, opts: { x: number; y: number; width: number; height: number; seatsTop?: number; seatsBottom?: number; seatsLeft?: number; seatsRight?: number }): Table` — auto-generates seat objects with correct `side` and `order` values, evenly distributed along each side.
- `createRoundTable(id: string, opts: { x: number; y: number; diameter: number; seatCount: number }): Table` — auto-generates seats with evenly spaced `angle` values around the table.
- `getSeatPosition(table: Table, seat: Seat): { x: number; y: number }` — computes absolute (x, y) coordinates for a seat relative to its table:
  - Rect tables: offset seats along the given side, centered, spaced ~30px apart, positioned ~20px outside the table edge.
  - Round tables: place seats on a circle with radius = table radius + ~20px, using the seat's `angle`.

Assign each generated seat a random/default status of `'empty'` and no `agentName` unless mock data overrides it — mock data will supply real values.

## Mock data

Create `lib/mockData.ts` exporting a `floors: Floor[]` array with:
- 2 floors ("Floor 1", "Floor 2")
- Each floor: 3-4 rooms of varying sizes, positioned so they don't overlap within the floor's width/height
- Each room: 1-3 tables, mixing rect and round shapes, using the `createRectTable` / `createRoundTable` helpers
- Populate a realistic mix of seat statuses (`active`, `absent`, `break`, `offline`, `empty`) and sample agent names across seats, so the dashboard looks populated for a demo.

## Components

All components are client components (`'use client'` at the top) since this is a fully static export with no server-rendered interactivity needed beyond initial static HTML.

- **`components/FloorTabs.tsx`** — tab/button row to switch between floors. Manages selected floor id via props/state lifted to the parent page.
- **`components/FloorPlan.tsx`** — renders one `<svg>` for the selected floor (`viewBox` based on floor width/height), maps over `floor.rooms`, renders a `<RoomBlock>` for each.
- **`components/RoomBlock.tsx`** — renders a `<g>` with a `<rect>` for the room boundary + room name `<text>` label, and maps over `room.tables` rendering a `<TableBlock>` for each.
- **`components/TableBlock.tsx`** — renders the table shape (`<rect>` with rounded corners for rect tables, `<circle>` for round tables) and maps over `table.seats`, computing each seat's position via `getSeatPosition()` and rendering a `<Seat>`.
- **`components/Seat.tsx`** — renders a small `<circle>` or `<rect>` colored according to `seat.status` (see color mapping below). On hover (`onMouseEnter`/`onMouseLeave`), shows a tooltip (simple absolutely-positioned div driven by local state — no external tooltip library needed, keep it lightweight) displaying agent name, status (capitalized), room name, and table id.
- **`components/StatusLegend.tsx`** — small legend showing each status color + label, displayed above or beside the floor plan.

## Status color mapping

Create `lib/statusColors.ts`:

```ts
export const statusColors: Record<SeatStatus, string> = {
  active: '#22c55e',   // green
  absent: '#ef4444',   // red
  break: '#f59e0b',    // amber
  offline: '#9ca3af',  // gray
  empty: '#e5e7eb',    // light gray, near-white
};
```

Use Tailwind classes where possible for layout/spacing, but use inline `fill`/`stroke` SVG attributes (via the color map) for seat coloring since Tailwind's JIT can't dynamically generate arbitrary fill classes from a variable.

## Page

`app/seating/page.tsx` (or update `app/page.tsx` if this should be the homepage — ask me if unsure, default to `app/seating/page.tsx`):

- `'use client'` component.
- Local state for `selectedFloorId`.
- Renders `<StatusLegend />`, `<FloorTabs />`, and `<FloorPlan floor={selectedFloor} />` inside a clean, professional layout: page title, subtle borders, white/light background, generous padding, Tailwind-based card styling (`rounded-lg border shadow-sm p-4` type utility patterns).
- Keep the visual style clean and professional — minimal shadows, no heavy animation. A simple `transition-colors` on seat hover is enough; no complex motion library needed.

## Constraints

- No external libraries beyond what's already in the project (React, Next.js, Tailwind). Do not install Konva, Fabric, D3, or any tooltip/animation library — build the tooltip and interactions with plain React state and Tailwind.
- No API routes, no `fetch` to a backend, no server actions — all data comes from the local `mockData.ts` file so this works fully as a static export (`next build` with `output: 'export'`).
- Keep components typed with TypeScript throughout, using the types from `lib/types.ts`.
- Keep SVG coordinate math centralized in `lib/seatLayout.ts` so components stay declarative and just call the helper functions.
- Make sure the floor plan SVG scales responsively (use `viewBox` + `w-full h-auto` rather than fixed pixel dimensions) so it looks reasonable on different screen sizes.

## Deliverable checklist

1. `lib/types.ts`
2. `lib/seatLayout.ts`
3. `lib/statusColors.ts`
4. `lib/mockData.ts`
5. `components/FloorTabs.tsx`
6. `components/FloorPlan.tsx`
7. `components/RoomBlock.tsx`
8. `components/TableBlock.tsx`
9. `components/Seat.tsx`
10. `components/StatusLegend.tsx`
11. `app/seating/page.tsx`

After generating, double check `next.config.ts` has `output: 'export'` set (add it if missing) so the project builds correctly to the `out/` folder with no server dependency.