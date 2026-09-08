'use client';

import { useMemo, useState } from 'react';
import { floors } from '@/lib/mockData';
import { FloorPlanCard } from './FloorPlanCard';
import { FloorTabs } from './FloorTabs';
import { SeatingHeader } from './SeatingHeader';
import { SeatTooltip } from './SeatTooltip';
import { SeatTooltipProvider } from './SeatTooltipContext';
import { StatusLegend } from './StatusLegend';

export function SeatingDashboard() {
  const [selectedFloorId, setSelectedFloorId] = useState(floors[0].id);
  const selectedFloor = useMemo(
    () => floors.find((floor) => floor.id === selectedFloorId) ?? floors[0],
    [selectedFloorId],
  );

  return (
    <SeatTooltipProvider>
      <div className="min-h-full bg-background px-5 py-5 text-ink">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          <SeatingHeader />
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-card px-3 py-2.5 shadow-sm">
            <FloorTabs floors={floors} selectedFloorId={selectedFloorId} onSelect={setSelectedFloorId} />
            <StatusLegend />
          </div>
          <FloorPlanCard floor={selectedFloor} />
        </div>
        <SeatTooltip />
      </div>
    </SeatTooltipProvider>
  );
}
