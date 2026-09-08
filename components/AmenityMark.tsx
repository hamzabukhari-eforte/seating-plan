'use client';

import type { Amenity } from '@/lib/types';
import { theme } from '@/lib/theme';
import { AmenityIcon } from './AmenityIcon';

export function AmenityMark({ amenity }: { amenity: Amenity }) {
  return (
    <g transform={`translate(${amenity.x} ${amenity.y})`}>
      <rect x={-13} y={-13} width={26} height={26} rx={6} fill={theme.primarySubtle} />
      <AmenityIcon kind={amenity.kind} />
    </g>
  );
}
