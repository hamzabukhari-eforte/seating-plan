'use client';

import type { Floor } from '@/lib/types';

interface FloorTabsProps {
  floors: Floor[];
  selectedFloorId: string;
  onSelect: (id: string) => void;
}

export function FloorTabs({ floors, selectedFloorId, onSelect }: FloorTabsProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Floors">
      {floors.map((floor) => {
        const selected = floor.id === selectedFloorId;
        return (
          <button
            key={floor.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect(floor.id)}
            className={`rounded-md border px-3 py-1 text-xs font-semibold transition-colors ${
              selected
                ? 'border-primary bg-primary text-white shadow-sm'
                : 'border-line bg-page text-ink hover:bg-primary-subtle'
            }`}
          >
            {floor.name}
          </button>
        );
      })}
    </div>
  );
}
