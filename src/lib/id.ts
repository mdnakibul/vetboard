export function generateId() {
  return crypto?.randomUUID?.() || Math.random().toString(36).substring(2, 10);
}
