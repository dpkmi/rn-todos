export function parseDateToMs(input: string): number | undefined {
  const s = input.trim();
  if (!s) return undefined;
  const d = new Date(s);
  return isNaN(d.getTime()) ? undefined : d.getTime();
}

export function formatDate(ms?: number): string {
  if (!ms) return "";
  return new Date(ms).toISOString();
}
