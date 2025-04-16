export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'vettmepro'); // Replace with your actual preset
  
    const response = await fetch('https://api.cloudinary.com/v1_1/ijm-global-limited/video/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload video');
    }
  
    const data = await response.json();
    return data.secure_url; // The URL of the uploaded video
};
  