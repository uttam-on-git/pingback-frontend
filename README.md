# PingBack - Frontend

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

This repository contains the frontend client for **PingBack**, a simple yet powerful email tracking application. This React application provides the user interface for signing in, sending tracked emails, and viewing analytics.

---

## ✨ Features

- **Modern UI:** Built with React, TypeScript, and styled with Tailwind CSS for a beautiful and responsive user experience.
- **Secure Authentication Flow:** Handles the client-side of the Google OAuth 2.0 flow, securely storing JWTs.
- **Protected Routes:** Ensures that only authenticated users can access the main dashboard.
- **Dynamic Components:** Includes components for composing emails and displaying a real-time list of sent emails and their open counts.
- **Modular & Scalable:** Structured with a focus on reusable components and custom hooks for clean and maintainable code.

---

## 🛠️ Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Code Quality:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

---

## 🚀 Getting Started

This section will guide you through setting up a local development environment.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A running instance of the [PingBack Backend](https://github.com/uttam-on-git/pingback-backend)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/uttam-on-git/pingback-frontend.git](https://github.com/uttam-on-git/pingback-frontend.git)
    cd pingback-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    - In the root of the project, create a new file named `.env`.
    - Add the following variable, pointing to your local backend server:
      ```env
      VITE_BACKEND_API_URL="http://localhost:3000"
      ```

### Running the Application

- To start the development server with hot-reloading:
  ```bash
  npm run dev
  ```
- The application will be available at `http://localhost:5173` (or the next available port).

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Lints the code for errors and warnings.
- `npm run format`: Formats all files with Prettier.
- `npm run preview`: Serves the production build locally for testing.

---

## 🔑 Environment Variables

The following variables need to be set in a `.env` file for the application to work correctly. Note the `VITE_` prefix is required by Vite to expose the variable to the frontend.

| Variable               | Description                                | Example                 |
| :--------------------- | :----------------------------------------- | :---------------------- |
| `VITE_BACKEND_API_URL` | The public URL of the backend API service. | `http://localhost:3000` |

---

## 🤝 Contributing

Contributions are welcome! If you have a suggestion or find a bug, please open an issue. If you'd like to contribute code:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
