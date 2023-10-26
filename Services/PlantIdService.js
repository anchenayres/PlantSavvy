import axios from "axios";
import Config from "react-native-config";

const apiKey = Config.PLANT_ID_API_KEY;

async function identifyPlant(imageBase64, latitude, longitude, similarImages = true) {
  const apiUrl = 'https://plant.id/api/v3/identification';

  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [imageBase64],
        latitude,
        longitude,
        similar_images: similarImages,
      },
      {
        headers: {
          'Api-Key': Config.PLANT_ID_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
      } catch (error) {
        console.error('Error identifying plant:', error);
        throw error;
      }
    }

    export { identifyPlant };