export const savePathToApi = async (path: Array<[number, number]>) => {
    try {
      const response = await fetch('/api/savePath', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
      return response.ok;
    } catch (error) {
      console.error('Failed to save path to API:', error);
      return false;
    }
  };
  