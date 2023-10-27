import axios from "axios";
import Config from "react-native-config";


async function identifyPlant(imageBase64, latitude, longitude) {
  const apiUrl = 'https://plant.id/api/v3/identification';

  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [imageBase64],
        latitude,
        longitude,
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
    return { error: 'Plant identification failed' };
  }
}

    export { identifyPlant };