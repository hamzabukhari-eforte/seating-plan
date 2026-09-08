'use client';

import type { Table } from '@/lib/types';
import { theme } from '@/lib/theme';

export function TableLabel({ table }: { table: Table }) {
  if (!table.label) return null;

  return (
    <text
      x={table.x + table.width / 2}
      y={table.y + table.height / 2}
      textAnchor="middle"
      dominantBaseline="central"
      fill={theme.label}
      fontSize={9}
      fontWeight={600}
      letterSpacing={0.4}
      className="pointer-events-none select-none"
    >
      {table.label}
    </text>
  );
}
