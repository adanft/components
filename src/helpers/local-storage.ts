export function getStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function setStorage(key: string, data: string): void {
  localStorage.setItem(key, data);
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key);
}
