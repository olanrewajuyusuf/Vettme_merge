export interface Location {
    lat: number;
    lon: number;
    timestamp?: string;
}

const KEY = "pk.92f4518312758b5710863b5eed06efb4";
  
export const getGeolocation = (
    onSuccess: (location: Location, accuracy: number) => void,
    onError: (error: string) => void
  ): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          const newLocation: Location = {
            lat: latitude,
            lon: longitude,
            timestamp: new Date().toISOString(),
          };
  
          onSuccess(newLocation, accuracy);
        },
        (error) => {
          onError(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      onError("Geolocation is not supported by your browser.");
    }
};

// Fetch the address using Nominatim API (Reverse Geocoding)
export const getAddressFromCoordinates = async (
  lat: number,
  lon: number
): Promise<string> => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${KEY}&lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    return data.display_name || "Address not found";
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error fetching address";
  }
};

export interface Coordinates {
  lat: number;
  lon: number;
}

// Fetches the latitude and longitude of a given address using the Nominatim API.
export const getCoordinatesFromAddress = async (address: string | null) => {
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${KEY}&q=${encodeURIComponent(address as string)}&format=json`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
      };
    } else {
      console.warn("No results found for the given address.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
};

// Haversine formula to calculate distance
export const calculateDistance = (lat1: number | undefined, lon1: number | undefined, lat2: number | undefined, lon2: number | undefined): number => {
    const R = 6371; // Radius of the Earth in km
    const phi1 = (lat1 as number * Math.PI) / 180;
    const phi2 = (lat2 as number * Math.PI) / 180;
    const deltaPhi = ((lat2 as number - (lat1 as number)) * Math.PI) / 180;
    const deltaLambda = ((lon2 as number - (lon1 as number)) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));    
    return R * c; // Distance in km
};