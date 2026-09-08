export function clampTooltipPosition(
  x: number,
  y: number,
  width = 200,
  height = 130,
): { left: number; top: number } {
  if (typeof window === 'undefined') {
    return { left: x + 14, top: y + 14 };
  }

  return {
    left: Math.max(12, Math.min(x + 14, window.innerWidth - width - 12)),
    top: Math.max(12, Math.min(y + 14, window.innerHeight - height - 12)),
  };
}
