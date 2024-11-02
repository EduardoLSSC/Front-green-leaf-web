// src/api/trailApi.ts
export const fetchAllTrails = async () => {
    try {
      const response = await fetch('/api/trails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching all trails: ${response.statusText}`);
      }
  
      return response.json();
    } catch (error) {
      console.error("Error fetching all trails:", error);
      throw error;
    }
  };
  
  export const fetchTrail = async (trailId: number) => {
    try {
      const response = await fetch(`/api/trails/${trailId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching trail: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Fetched Trail Data:", data); // Debugging line
      return data;
    } catch (error) {
      console.error("Error fetching trail data:", error);
      throw error;
    }
  };
  
  