import axios from "axios";
import Config from "react-native-config";
console.log("Environment Variables:", Config);

async function identifyPlant(imageBase64, latitude, longitude, similar_images) {
  const apiUrl = 'https://plant.id/api/v3/identification';

  const PlantIdApiKey = 'OKsSs9dRIQRkLhJY2kkqvmcPW5Koo13unmXUjxCTkIctoHshYL';
  console.log("Plant ID API Key:", PlantIdApiKey);

  
  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [imageBase64],
        latitude,
        longitude,
        similar_images: similar_images,
        health: "all",
      },
      {
        headers: {
          'Api-Key': PlantIdApiKey,
          'Content-Type': 'application/json',
        },
        
      }
    );
    return response.data;
  } catch (error) {
    console.error('Response:', error.response);
    return { error: 'Plant identification failed', status: error.response ? error.response.status : 500, };
    
  }
}

async function assessPlantHealth(imageBase64, latitude, longitude, similar_images) {
  const apiUrl = 'https://plant.id/api/v3/health_assessment';
  const PlantIdApiKey = 'OKsSs9dRIQRkLhJY2kkqvmcPW5Koo13unmXUjxCTkIctoHshYL';

  try {
    const response = await axios.post(
      apiUrl,
      {
        images: [imageBase64],
        latitude,
        longitude,
        similar_images: similar_images,

      },
      {
        headers: {
          'Api-Key': PlantIdApiKey,
          'Content-Type': 'application/json',
        },
        params: {
          language: 'en', // Replace with your desired language
          details: 'local_name,description,url,treatment,classification,common_names,cause', // Replace with your desired disease details
          async: true, // Optional, set to true if you don't want to wait for the response
          full_disease_list: true, // Optional, set to true for full disease details
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Health Assessment Response:', error.response);
    return { error: 'Plant health assessment failed', status: error.response ? error.response.status : 500 };
  }
}


export { identifyPlant, assessPlantHealth };