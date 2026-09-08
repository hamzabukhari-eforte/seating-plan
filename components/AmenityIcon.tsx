'use client';

import type { AmenityKind } from '@/lib/types';
import { theme } from '@/lib/theme';

export function AmenityIcon({ kind }: { kind: AmenityKind }) {
  const stroke = theme.primary;
  if (kind === 'stairs') {
    return <path d="M-6 6 H-2 V2 H2 V-2 H6 V-6" fill="none" stroke={stroke} strokeWidth={1.6} />;
  }
  if (kind === 'lift') {
    return (
      <>
        <rect x={-6} y={-6} width={12} height={12} fill="none" stroke={stroke} strokeWidth={1.5} />
        <path d="M-4 -4 L4 4 M4 -4 L-4 4" fill="none" stroke={stroke} strokeWidth={1.2} />
      </>
    );
  }
  if (kind === 'toilet') {
    return <circle cx={0} cy={0} r={5} fill="none" stroke={stroke} strokeWidth={1.6} />;
  }
  if (kind === 'lockers') {
    return <rect x={-6} y={-5} width={12} height={10} rx={1.5} fill="none" stroke={stroke} strokeWidth={1.5} />;
  }
  if (kind === 'tv') {
    return <rect x={-7} y={-4} width={14} height={8} rx={1.5} fill="none" stroke={stroke} strokeWidth={1.5} />;
  }
  if (kind === 'vending') {
    return <rect x={-4} y={-7} width={8} height={14} rx={1.5} fill="none" stroke={stroke} strokeWidth={1.5} />;
  }
  if (kind === 'kitchen' || kind === 'pantry') {
    return <path d="M-6 5 H6 M-4 5 V-4 H4 V5" fill="none" stroke={stroke} strokeWidth={1.5} />;
  }
  if (kind === 'stall') {
    return <rect x={-5} y={-6} width={10} height={12} rx={1} fill="none" stroke={stroke} strokeWidth={1.4} />;
  }
  if (kind === 'urinal') {
    return <path d="M-4 -4 H4 V2 Q0 7 -4 2 Z" fill="none" stroke={stroke} strokeWidth={1.3} />;
  }
  if (kind === 'basin') {
    return <ellipse cx={0} cy={0} rx={6} ry={4} fill="none" stroke={stroke} strokeWidth={1.4} />;
  }
  return <circle cx={0} cy={1} r={3} fill={theme.primarySubtle} stroke={stroke} strokeWidth={1.4} />;
}
