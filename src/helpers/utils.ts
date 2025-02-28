export const getLocalStorageItem = <T>(key: string, fallback: T): T => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  }
  return fallback;
};
