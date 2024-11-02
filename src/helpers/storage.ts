export const saveToLocalStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };
  
  export const getFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  };
  