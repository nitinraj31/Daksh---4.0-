export function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (_) {}
}

export function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
}

