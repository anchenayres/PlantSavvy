import axios from "axios";
import Config from "react-native-config";

const apiUrl = "https://api.plant.id/v2/identify";
const apiKey = Config.PLANT_ID_API_KEY;

export const identifyPlant = (accessToken, latitude, longitude, imageUri, datetime) => {
    const requestData = {
      access_token: accessToken,
      model_version: "plant_id:3.1.3",
      custom_id: null,
      input: {
        latitude,
        longitude,
        similar_images: null,
        images: [imageUri],
        datetime,
      },
    };

    return axios.post(apiUrl, requestData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
      });
    
}
