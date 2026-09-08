'use client';

import type { Floor } from '@/lib/types';
import { FloorPlan } from './FloorPlan';

export function FloorPlanCard({ floor }: { floor: Floor }) {
  return (
    <section className="rounded-xl border border-line bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">Floor Plan</h2>
        <span className="rounded-md border border-line bg-page px-2 py-0.5 text-xs font-medium text-label">
          {floor.name}
        </span>
      </div>
      <div className="rounded-lg border border-line bg-page">
        <FloorPlan key={floor.id} floor={floor} />
      </div>
    </section>
  );
}
