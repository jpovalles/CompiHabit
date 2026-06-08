<div align="center">

![](docs/images/icon.png)

# CompiHabit

**Mobile application that promotes healthy habit adoption through shared accountability and gamification.**

[![Expo](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev)
[![Supabase](https://img.shields.io/badge/Backend-Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)

</div>

---

## About

CompiHabit is a mobile application focused on helping users build and maintain healthy habits through shared commitments and accountability mechanisms. The platform allows users to create habit pacts, submit evidence of completion, track streaks, unlock achievements, and monitor their progress over time.

This project was developed as part of an undergraduate thesis in Systems Engineering.

---

## Features

- User authentication and profile management.
- Habit pact creation and management.
- Habit completion evidence submission.
- Streak tracking and monitoring.
- Achievement and badge system.
- Real-time updates for pacts and streaks.
- Image capture and image selection from device gallery.
- Cloud storage integration for user content.
- Mobile-first user experience built with React Native.

---

## Demo

### Authentication

![Authentication Screen](docs/images/authentication.png)

### Home Screen

![Home Screen](docs/images/home.png)

### Habit Pacts

![Habit Pacts](docs/images/pacts.png)

### Streak Tracking

![Streak Tracking](docs/images/streaks.png)

### Achievements

![Achievements](docs/images/achievements.png)

### Profile

![Profile](docs/images/profile.png)

> Create a `docs/images/` folder and replace the placeholder images with actual application screenshots.

---

## Tech Stack

| Category | Technology |
|-----------|------------|
| Mobile Development | React Native |
| Framework | Expo SDK 54 |
| Navigation | Expo Router, React Navigation |
| Backend Services | Supabase |
| Database Access | Supabase JavaScript Client |
| Storage | Supabase Storage |
| Camera Integration | Expo Camera |
| Image Upload | Expo Image Picker |
| UI Components | HeroUI Native |
| State & Context | React Context API |
| Development Language | JavaScript (JSX) |

---

## Project Structure

```text
CompiHabit
├── assets/
│   └── images/
├── lib/
│   └── supabase.js
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (tabs)/
│   │   ├── index.jsx
│   │   └── _layout.jsx
│   ├── components/
│   ├── constants/
│   ├── context/
│   ├── hooks/
│   ├── logic/
│   ├── screens/
│   ├── services/
│   └── utils/
├── app.json
├── eas.json
└── package.json
```

### Main Directories

| Directory | Purpose |
|------------|---------|
| `src/app` | Application routes and navigation configuration |
| `src/components` | Reusable UI components |
| `src/screens` | Feature-specific screens |
| `src/context` | Authentication and shared application state |
| `src/hooks` | Custom React hooks |
| `src/logic` | Business logic layer |
| `src/services` | Database and storage interactions |
| `src/utils` | Utility functions |
| `lib` | Shared services and Supabase configuration |

---

## Installation

### Prerequisites

- Node.js 18+
- npm
- Expo CLI (optional)
- Supabase project

### Clone the repository

```bash
git clone https://github.com/jpovalles/CompiHabit.git
cd CompiHabit
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file in the project root and add your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=your_project_url
EXPO_PUBLIC_SUPABASE_KEY=your_anon_key
```

### Run the application
```bash
npx expo start
```
---

## Architecture Overview

The application follows a layered structure:

- **Presentation Layer**: Screens and reusable components.
- **Business Logic Layer**: Domain-specific logic contained in the `logic` directory.
- **Service Layer**: Database and storage operations.
- **Backend Layer**: Supabase services for authentication, persistence, and file storage.

This separation helps maintain scalability, readability, and easier testing of application features.

---

## Author

**Juan Pablo Ovalles**

Systems Engineering Student  
Pontificia Universidad Javeriana Cali
