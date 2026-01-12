# Quick-Pic: A Mobile Image Explorer

Quick-Pic is a mobile application built with React Native and Expo, designed for browsing and exploring images. It provides a simple and intuitive interface for users to view a collection of images, with features for searching and viewing high-resolution images.

## Features

*   **Image Gallery:** Browse a gallery of images in a clean and organized layout.
*   **Image Search:** Search for specific images.
*   **High-Resolution Viewer:** View images in a high-resolution modal view.
*   **Cross-Platform:** Runs on Android, iOS, and the web.

## Getting Started

To get started with Quick-Pic, follow these steps:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start the Application:**
    ```bash
    npx expo start
    ```

    This will open the Expo developer tools in your browser. You can then choose to run the app on an Android emulator, iOS simulator, or on a physical device using the Expo Go app.

## Available Scripts

In the project directory, you can run the following commands:

*   `npm start`: Starts the Expo development server.
*   `npm run android`: Starts the app on a connected Android device or emulator.
*   `npm run ios`: Starts the app on the iOS simulator.
*   `npm run web`: Starts the app in a web browser.
*   `npm run lint`: Lints the project files using ESLint.
*   `npm run reset-project`: Resets the project to a blank state.

## Technologies Used

*   **React Native:** A framework for building native apps using React.
*   **Expo:** A platform for making universal React applications.
*   **Expo Router:** A file-based routing system for React Native and web apps.
*   **React Query:** For data fetching and caching.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.
*   **TypeScript:** A typed superset of JavaScript.

## Project Structure

The project is organized as follows:

*   `app/`: Contains the screens and navigation logic for the app, using file-based routing.
*   `assets/`: Contains static assets like images and fonts.
*   `components/`: Contains reusable UI components.
*   `constants/`: Contains constants such as theme colors.
*   `hooks/`: Contains custom React hooks.
*   `lib/`: Contains library configurations, such as the React Query client.
*   `services/`: Contains services for interacting with external APIs.

Feel free to explore the code and contribute to the project!