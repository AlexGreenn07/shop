export function debounce<F extends (...arg: unknown[]) => unknown>(
  fn: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeouteId: number;
  return function (...args: Parameters<F>) {
    window.clearTimeout(timeouteId);
    timeouteId = window.setTimeout(() => fn(...args), delay);
  };
}
