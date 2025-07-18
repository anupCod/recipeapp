# 📱 RecipeApp

RecipeApp is a modern cross-platform mobile application built with **React Native**, **Expo Router**, and **TypeScript**. It provides a seamless user experience with a focus on performance, beautiful UI, and responsive design. The app leverages multiple Expo modules and React Navigation to offer features such as tabbed navigation, image handling, font customization, and embedded YouTube support.

---

## 🚀 Features

- 🍽️ Explore recipes with rich visuals
- 🧭 Smooth navigation using React Navigation
- 🎥 Embed YouTube cooking videos using `react-native-youtube-iframe`
- 🖼️ Image picking via `expo-image-picker`
- 🎨 Custom fonts with `@expo-google-fonts` and `expo-font`
- 💾 Persistent storage using `@react-native-async-storage/async-storage`
- 🌀 Blur and haptic effects with `expo-blur` and `expo-haptics`
- 🌐 Cross-platform support (iOS, Android, Web)

---

## 📦 Tech Stack

- **React Native 0.79.4**
- **Expo SDK 53**
- **Expo Router ~5.1.0**
- **TypeScript ~5.8.3**
- **React 19**
- **React Navigation**
- **Expo Modules:** `expo-image`, `expo-constants`, `expo-haptics`, `expo-system-ui`, `expo-splash-screen`, and more

---

## 📁 Project Structure

```
.
├── app/                # Screens and routes managed by Expo Router
├── components/         # Reusable UI components
├── assets/             # Fonts, images, and media
├── scripts/            # Utility scripts (e.g., reset-project.js)
├── tsconfig.json       # TypeScript configuration
├── package.json        # Project metadata and dependencies
└── ...
```

---

## 🛠️ Setup & Installation

### Prerequisites

- Node.js (LTS recommended)
- Expo CLI:  
  ```bash
  npm install -g expo-cli
  ```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/recipeapp.git
   cd recipeapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the project:
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

---

## 📱 Running on Devices

- **Android:** `npm run android`
- **iOS (Mac only):** `npm run ios`
- **Web:** `npm run web`

---

## 🧪 Linting

Run ESLint to check for issues:

```bash
npm run lint
```

---

## 🧑‍💻 Developers

- Uses strict TypeScript with `strict` mode enabled
- Base config extended from `expo/tsconfig.base`
- Module aliases defined via `@/*`

---

## 📃 License

This project is licensed under the MIT License.

---

## 📬 Contact

For questions, suggestions, or contributions, feel free to reach out at:

**Anup Bashyal**  
📧 bashyalanup789@gmail.com

---

## 🌟 Star this repo

If you find this project helpful or inspiring, please ⭐ the repo and consider contributing!
