import type { SeatStatus } from './types';

export const statusColors: Record<SeatStatus, string> = {
  active: '#22c55e',
  absent: '#ef4444',
  break: '#f59e0b',
  offline: '#9ca3af',
  empty: '#e5e7eb',
};

export const statusLabels: Record<SeatStatus, string> = {
  active: 'Active',
  absent: 'Absent',
  break: 'Break',
  offline: 'Offline',
  empty: 'Empty',
};
