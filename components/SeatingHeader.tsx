'use client';

import { SeatingBreadcrumb } from './SeatingBreadcrumb';

export function SeatingHeader() {
  return (
    <header>
      <SeatingBreadcrumb />
      <h3 className="mb-1.5 text-[1.35rem] font-bold leading-tight tracking-[-0.02em] text-primary">
        Office Seating
      </h3>
      <p className="text-[0.78rem] font-medium text-muted">
        AWT Plaza layout. Hover a seat for details. Click a room to zoom in.
      </p>
    </header>
  );
}
