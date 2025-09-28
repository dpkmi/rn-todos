export const id = () =>
  Math.random().toString(36).slice(2, 8) + "-" + Date.now().toString(36);
