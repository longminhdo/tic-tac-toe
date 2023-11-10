export const setToLocalStorage = (key, data) => {
  if (!key) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = (key) => {
  if (!key) {
    return null;
  }

  const item = localStorage.getItem(key);

  if (typeof item === 'string') {
    return JSON.parse(item);
  }

  return item;
};
