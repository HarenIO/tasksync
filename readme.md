
# TaskSync

**TaskSync** is a collaborative To-do app built with React, allowing users to manage and organize their tasks in a simple and intuitive way. The application is perfect for personal use or group projects


## Features

* User authentication and authorization using JSON Web Tokens.
* Create, view, update, and delete tasks within a tracker.
* Organize tasks into different lists.
* Collaborate with other users by inviting them to join a tracker.

## Technologies

The following technologies were used to build TaskSync:

**React / Vite**: The frontend library for building the user interface.
**Express**: The backend framework for handling API requests.
**Node.js**: The runtime environment for executing server-side JavaScript.
**MySQL**: The database management system for storing and managing data.
**Radix-UI**: A collection of UI components for building a modern and accessible UI.
**jsonwebtoken**: A library for handling JSON Web Tokens, used for authentication.
**react-router-dom**: A routing library for managing navigation in the React app.
**Joi**: A validation library for ensuring data integrity.

## Getting Started

To get started with TaskSync, follow these steps:

1. Clone the repository from GitHub.
2. Install the required dependencies using `npm install`.
3. Set up the MySQL database by executing the provided schema.
4. Rename and configure the .env.example file in */src/server/config/* with the required environment variables (e.g., database credentials, JWT secret).
5. Start the development server using `npm run dev` 
6. Open your browser and navigate to http://localhost:5173.