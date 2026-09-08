'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import type { Seat } from '@/lib/types';

export type TooltipPayload = {
  seat: Seat;
  roomName: string;
  tableLabel: string;
  seatNo: number;
  x: number;
  y: number;
};

type TooltipActions = {
  show: (payload: TooltipPayload) => void;
  hide: () => void;
};

const ActionsContext = createContext<TooltipActions | null>(null);
const PayloadContext = createContext<TooltipPayload | null>(null);

export function SeatTooltipProvider({ children }: { children: ReactNode }) {
  const [payload, setPayload] = useState<TooltipPayload | null>(null);
  const actions = useMemo<TooltipActions>(
    () => ({ show: setPayload, hide: () => setPayload(null) }),
    [],
  );

  return (
    <ActionsContext.Provider value={actions}>
      <PayloadContext.Provider value={payload}>{children}</PayloadContext.Provider>
    </ActionsContext.Provider>
  );
}

export function useSeatTooltipActions(): TooltipActions {
  const value = useContext(ActionsContext);
  if (!value) throw new Error('useSeatTooltipActions requires SeatTooltipProvider');
  return value;
}

export function useSeatTooltipPayload(): TooltipPayload | null {
  return useContext(PayloadContext);
}
