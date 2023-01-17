export const storageGet = (key) => {
    const val = localStorage.getItem(key);
    return val;
};

export const storageSet = (key, val) => {
    localStorage.setItem(key, val);
};

export const storageRemove = (key) => {
    localStorage.removeItem(key);
};

export const storageClear = () => {
    localStorage.clear();
};