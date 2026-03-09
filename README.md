Genshin Impact Database (React Native)


A mobile app built with React Native that serves as a complete database for Genshin Impact—including characters, weapons, bosses, and consumables. Browse, search, and filter in-game data with a smooth, mobile-friendly UI.

⸻

Features
```
	•	Character Gallery – Browse all characters with detailed stats and info.
	•	Weapon Materials – View weapon ascension and experience materials.
	•	Boss Info – Search bosses and check their drop materials.
	•	Food & Consumables – Explore in-game foods and their effects.
	•	Search & Filter – Quickly find items, bosses, or characters.
	•	Responsive UI – Optimized for mobile with clean React Native design.
```

⸻

Tech Stack
```
	•	React Native – Mobile UI
	•	Expo – App development
	•	Zustand – State management
	•	TypeScript – Type safety and structured code
	•	REST API – Fetch game data
	•	React Native Styling – Flexible and clean UI design
```

⸻

Project Structure

```
src/
├─ api/               # API endpoints and fetch logic
├─ components/        # Reusable UI components
│  ├─ common/         # Buttons, images, search bars
│  └─ screens/        # Screen-level components
├─ store/             # Zustand stores
├─ types/             # TypeScript type definitions
└─ config/            # Environment and constants
```


⸻

Installation
	1.	Clone the repository:
```
git clone https://github.com/yourusername/genshin-impact-db.git
cd genshin-impact-db
```

   2.	Install dependencies:
```
npm install
# or
yarn install
```

   3.	Run the app:
```
npx expo start
```

⸻

Building with EAS

To build the app for iOS or Android:

```
eas build --platform ios
eas build --platform android
```

(Ensure you have Expo EAS CLI installed and configured)

⸻

License

This project is licensed under the MIT License￼.
