# Quick-Pic (Lensly) 📸

> **A beautiful, high-performance mobile image explorer built with React Native & Expo.**

Quick-Pic (internally **Lensly**) is a feature-rich mobile application that allows users to discover, search, and curate high-resolution images. Built typically for browsing efficiency and visual appeal, it leverages the power of the [Pixabay API](https://pixabay.com/api/docs/) to deliver millions of stunning photos directly to your device.

---

## ✨ Features

- **🔐 User Authentication**: Secure Login and Signup flows to personalize the experience.
- **🌍 Discover**: Browse a curated feed of trending and editor's choice photos.
- **🔍 Powerful Search**: Instantly find what you're looking for with a robust search implementation (powered by Redux).
- **❤️ Wishlist**: Save your favorite images to a local wishlist for quick access later.
- **🖼️ High-Res Viewer**: Tap any image to view it in full-screen detail with smooth modal transitions.
- **📱 Cross-Platform**: Optimized for both Android and iOS devices.

## 🛠️ Tech Stack

This project uses a modern, robust stack designed for performance and developer experience:

- **Core Framework**: [React Native](https://reactnative.dev/) (via [Expo SDK 52](https://expo.dev/))
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Styling**: React Native StyleSheet & Vector Icons
- **Language**: [TypeScript](https://www.typescriptlang.org/)

##  Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- **Node.js** (LTS version recommended)
- **Expo Go** app installed on your physical device (Android/iOS) OR an Emulator/Simulator.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/okaady/quick-pic.git
    cd quick-pic
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npx expo start
    ```

4.  **Run on device/emulator:**
    -   **Physical Device**: Scan the QR code with the **Expo Go** app.
    -   **Emulator**: Press `a` for Android or `i` for iOS in the terminal.

## ⚠️ Important Notes

-   **API Key**: The project currently uses a pre-configured Pixabay API key located in `services/imageService/images/index.ts`. For production use, this should be moved to an environment variable (`.env`).
-   **Reset Project**: If you need to wipe the project state, run `npm run reset-project`.

## 📂 Project Structure

Here's a quick look at the top-level directory structure:

```
quick-pic/
├── app/                 # Screens and Navigation (Expo Router)
│   ├── auth/            # Authentication screens (Login/Signup)
│   ├── home/            # Main feed and dashboard
│   ├── _layout.tsx      # Root layout configuration
│   └── index.tsx        # Entry point
├── components/          # Reusable UI components (Buttons, Cards, Inputs)
├── services/            # API and Logic references
│   ├── imageService/    # Pixabay API integration
│   ├── UserService/     # User data management
│   └── wishlist/        # Wishlist service logic
├── store/               # Redux store and slices
├── assets/              # Static images and fonts
└── constants/           # App-wide constants (Colors, Themes)
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any bugs, please modify the code and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).