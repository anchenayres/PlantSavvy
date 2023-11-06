# PlantSavvy - Creative Web Development Agency Management System

![Github label](https://img.shields.io/badge/PlantSavvy-2023-blueviolet)

<h3 align="center">Designed & Developed by:</h3>
<h5 align="center">Anchen Ayres</h5>
<h6 align="center">DV 300 | Term 4 | 2023</h6>

<p align="center">
    <a href="https://github.com/anchenayres/PlantSavvy">
        <img src="./assets/plantLogo2.png" alt="Logo" width="230">
    </a>
</p>

## Table of Contents

- [About The Project](#about-the-project)
  - [Project Description](#project-description)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [How To Install](#how-to-install)
- [Development Process](#development-process)
- [Final Outcomes](#final-outcomes)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

![image0](./assets/mockup1.png)

## About the Project

Overview - 
Welcome to PlantSavvy, it is a mobile application which helps you identify and manage your plant collection. Whether you are a gardening enthusiast or just curious about the plants around you, this app provides the tools to explore, identify, and learn about plants.

* Machine Learning Model - 
The AI service uses a machine learning model that has been trained on a vast dataset of plant images. The model has learned to recognize different plant species and characteristics based on the input data.

### Project Description

The AI service in PlantSavvvy is responsible for plant identification. It enables users to take a photo of a plant or upload an image from their device, and the service uses artificial intelligence to analyze the image and provide information about the plant.

### Technologies Used

- React Native
- Firebase
- Plant.id V3 API

## Getting Started

The following steps and instructions will guide you through setting up the Nova management system on your local machine for development, practice, and testing purposes.

### How to Install

## PlantSavvy

This project was developed using React Native.

### Development Environment

1. Clone the PlantSavvy repository from [GitHub](https://github.com/anchenayres/PlantSavvy).
2. Open the solution in Visual Studio Code
3. Install all the dependencies

```ruby
npm install
```

4. Start the development server

```ruby
npm start
```

5. Open the app on your mobile device using the Expo Go app, or run it in a simulator.


## Development Process

The Development Process outlines the technical implementations and functionalities integrated into the frontend and backend of the Plant Identification AI Service.

### Implementation Approach

PlantSavvy is designed to provide plant identification and health assessment features to users. Below is the implementation approach that outlines the key technologies and strategies used to build this app.

### Frontend Development

The applications frontend is developed using the following technologies and strategies:

* React Native: We chose React Native for its ability to create a consistent user experience across both iOS and Android devices.

* React Navigation: Navigation within the app is managed using the React Navigation library to ensure a smooth user journey.

* User Interface: We utilize a combination of standard React Native components, custom components, and styles to create an intuitive and visually pleasing user interface.

### Backend and Data Management

The applications backend and data management are powered by:

* Firebase Authentication: User authentication is handled securely through Firebase Authentication, ensuring user data privacy.

* Firebase Cloud Storage: Images and user data are stored in Firebase Cloud Storage for seamless data management.

* External API Integration: The app integrates with an external AI service, which provides plant identification and health assessment capabilities.

### Data Storage

For data storage, the following was used:

* Firebase Realtime Database: We store and retrieve user data, image metadata, and app settings through Firebase Realtime Database.

* Local Storage: Certain data, such as user preferences and temporary data, is stored locally on the user's device to improve app performance.

### Core Features

![image0](./assets/mockup2.png)

### Onboarding

- If you register a new user, it showcases the use of the application in 4 steps
- Gives you information about what this application entails

### Plant Identification

- Capture or upload images of plants to identify them.
- Get detailed information about the identified plant, including common names, taxonomy, and description.

### Health Assessment

- Assess the health of your plants by analyzing their images.
- Receive information about potential diseases and their probabilities.
- View similar images of plants for reference.

### Plant Collection

- Create and manage your plant collection.
- Upload and store images of your plants on Firebase in a base64 format
- Easily access your collection for reference.

### User Authentication

- Sign in and securely access your data.
- Keep your plant collection and identification history safe.

### User-Friendly Interface

- Intuitive and user-friendly design for a seamless experience.

## Challenges, Highlights & Learnings

### Challenges

Once I got the hand of the Plant.id API it was fairly easy to implement functionality but the biggest issue from the beginning was the base64 image format which needed to be stored in Firebase.

### Highlights

A highlight for me was the implementation of an AI service within my application. Despite some of the complexities, I relished the challenge and firmly believe that it contributed to my growth as developers.

### Key Learnings

The  development journey for PlantSavvy emphasized the importance of thoughtful architecture, efficient resource management, and intuitive design. The experience enriched my understanding of creating comprehensive applications.

## Future Enhancements

In the future, I aspire to delve deeper into Nova's functionalities, including the capability to have indepth health report and create a calendar to remind users to water their plants or care for certain plants based on the health report. I would also like to ensure that PlantSavvy provides a seamless experience for all.

## Peer Feedback
The feedback is based on the beginning process of the app, the AI Service wasn't working as it should've at this point.

After registering, what are you initial thoughts about the app? Is it something you would be interested in?
*  "It's a super clean girl aesthetic. I think I would be interested in it if I had plants."
*  "The app is aesthetically pleasing, but due to the API not working I don't really know (But I think i would!)."
*  "I like the design, the app feels really good and easy to navigate."

Please navigate to the Register Screen and register yourself as a new user. On a scale of 1-10, how was this process for you?
* 8
* 10
* 10
* 10

Upload an image. Would you say this process was easy enough to follow?
* "I just think a button must be added to make it more clear."
* "Definetly, I would just recommend adding a button instead of clicking on the text."
* "The process was simple and easy to follow."

Are you able to locate the details about the plant and health assessment and was it easy to locate?
* "Yes that was easy - maybe add a loader though."
* "yes, it was extremely easy."
* "Yes, pretty straight forward, just clicked on the uploaded image."

On a scale 1-10, how would you describe the flow of the app?
* 6
* 8
* 10

Are there any additional features you would've liked to see, and why?
* "Nope"
* "Maybe adding a calendar for reminders (like watering your plants)."
* "I don't think there needs to be any changes. The app works well."

As there is no real data being represented yet for the identification and health report, were you still able to get an understanding of what the project is about?
* "Yes"
* "Mostly, I do think if I was given data before hand it would make it a bit nicer."
* "Absolutely"


![image2](./assets/mockup3.png)

Visit the [GitHub repository](https://github.com/anchenayres/PlantSavvy) for an overview of proposed features and ongoing development (if applicable).

## Authors

- **Anchen Ayres** - [anchenayres](https://github.com/anchenayres)

## License

PlantSavvy is open-source and available under the MIT License. You are free to use, modify, and distribute the code as permitted by the license.

Please refer to the app's official documentation and the LICENSE.md file for more details.

## Contact

- **Project Link** - https://github.com/anchenayres/PlantSavvy

## Acknowledgements

- [StackOverflow](https://stackoverflow.com/)
- [Plant.id](https://plant.id/)
- [Plant.id V3 API Documentation](https://documenter.getpostman.com/view/24599534/2s93z5A4v2#auth-info-c4a4048d-ed97-4532-8980-3159ddbfe629)

![image3](./assets/mockup4.png)
![image4](./assets/mockup5.png)
![image5](./assets/mockup6.png)
