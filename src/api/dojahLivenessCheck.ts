import axios from 'axios';

const DOJAH_API_KEY = 'prod_sk_yFpQKxR0fZHuXu8XvEr9TAwty';
const DOJAH_APP_ID = '67ae738fff00e407ada3a507';
const DOJAH_BASE_URL = 'https://api.dojah.io';

interface LivenessCheckResponse {
  entity: {
    liveness: {
      liveness_check: boolean;
      liveness_probability: number;
    };
    face: {
      face_detected: boolean;
      message: string;
      multiface_detected: boolean;
      details: {
        age_range: { low: number; high: number };
        smile: { value: boolean; confidence: number };
        gender: { value: string; confidence: number };
        eyeglasses: { value: boolean; confidence: number };
        sunglasses: { value: boolean; confidence: number };
        beard: { value: boolean; confidence: number };
        mustache: { value: boolean; confidence: number };
        eyes_open: { value: boolean; confidence: number };
        mouth_open: { value: boolean; confidence: number };
        emotions: { type: string; confidence: number }[];
      };
      quality: {
        brightness: number;
        sharpness: number;
      };
      confidence: number;
      bounding_box: {
        width: number;
        height: number;
        left: number;
        top: number;
      };
    };
  };
}

export const performLivenessCheck = async (imageFile: File): Promise<LivenessCheckResponse> => {
  // Convert the image file to a Base64-encoded string
  const reader = new FileReader();
  const base64Image = await new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(imageFile);
  });

  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64Data = base64Image.split(',')[1];

  try {
    const response = await axios.post<LivenessCheckResponse>(
      `${DOJAH_BASE_URL}/api/v1/ml/liveness/`,
      { image: base64Data },
      {
        headers: {
          'AppId': DOJAH_APP_ID,
          'Authorization': DOJAH_API_KEY,
          'Content-Type': 'application/json',
        },
        timeout: 10000, // Set a timeout of 10 seconds
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error Response:', error.response.data);
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        throw new Error('Network Error: No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
        throw new Error(`Request Error: ${error.message}`);
      }
    } else {
      // Unknown error
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred.');
    }
  }
};