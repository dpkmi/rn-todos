export function parseDateToMs(input: string): number | undefined {
  const s = input.trim();
  if (!s) return undefined;
  const d = new Date(s);
  if (isNaN(d.getTime())) return undefined;
  return d.getTime();
}

export function formatDate(ms?: number): string {
  if (!ms) return "";
  return new Date(ms).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
