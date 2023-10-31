import axios from "axios";
import Config from "react-native-config";
console.log("Environment Variables:", Config);

async function identifyPlant(imageBase64, latitude, longitude, similar_images, health) {
  const apiUrl = 'https://plant.id/api/v3/identification';

  const PlantIdApiKey = Config.PLANT_ID_API_KEY;
  console.log("Plant ID API Key:", PlantIdApiKey);

  
  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [imageBase64],
        latitude,
        longitude,
        similar_images: similar_images,
        health,
      },
      {
        headers: {
          'Api-Key': PlantIdApiKey,
          'Content-Type': 'application/json',
        },
        
      });

      
    

    return response.data;
  } catch (error) {
    console.error('Response:', error.response);
    return { error: 'Plant identification failed', status: error.response ? error.response.status : 500, };
    
  }
}

export { identifyPlant };