export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

