'use client';

import type { Table } from '@/lib/types';
import { theme } from '@/lib/theme';

export function TableShape({ table }: { table: Table }) {
  const fill = theme.page;
  const stroke = theme.line;

  if (table.shape === 'sofa') {
    return (
      <rect
        x={table.x}
        y={table.y}
        width={table.width}
        height={table.height}
        rx={8}
        fill={theme.primarySubtle}
        stroke={theme.primary}
        strokeWidth={1.2}
      />
    );
  }

  if (table.shape === 'round') {
    return (
      <circle
        cx={table.x + table.width / 2}
        cy={table.y + table.height / 2}
        r={table.width / 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.5}
      />
    );
  }

  return (
    <rect
      x={table.x}
      y={table.y}
      width={table.width}
      height={table.height}
      rx={7}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.4}
    />
  );
}
