## 🧑‍💻 Single Page Application (SPA) - User Management
This project is a robust and efficient Single Page Application (SPA), built entirely with pure JavaScript. Its main objective is to offer a complete solution for user management, including creation, listing, editing, and deletion functionality. It also incorporates a basic authentication system to control access based on user roles.

# ✨ Key Features
User Authentication (Login): Login system to control access.

- Comprehensive User Management:

- Listing: View all registered users.

- Creation: Add new users (feature exclusively for administrators).

- Editing: Modify existing user information.

- Deletion: Delete users from the database.

- SPA Routing: Smooth navigation without page reloads thanks to the use of pushState in the browser history.

- Role Control: Differentiation of functionality and access between admin and user users.

- Data Persistence: Use of localStorage for managing sessions and other essential data.

- Responsive Design: Minimalist user interface that adapts to different screen sizes.

📂 Project Structure

├── src/
│ ├── pages/ # Partial HTML files for each view (login, users, etc.)
│ ├── scripts/
│ │ ├── main.js # Main entry point for the application.
│ │ ├── router.js # Core logic for SPA routing and navigation.
│ │ ├── auth.js # Module for authentication and session control.
│ │ ├── users.js # UI functionality related to user management.
│ │ ├── event.js # UI functionality related to user management.
│ │ ├── registrationEvents.js # UI functionality related to user management.
│ │ └── services.js # Fetch functions for interacting with the API (GET, POST, PUT, DELETE).
│ └── styles/
│ └── global.css # General and component styles for the application.
└── index.html # Main HTML file for the SPA.
⚙️ System Requirements
To run this project, you will need:

Node.js (optional, but recommended if you're using JSON Server locally).

JSON Server: A lightweight tool for simulating a RESTful API.

## 🚀 How to Start the Project
Follow these simple steps to get the application up and running:

Install JSON Server (if you don't have it installed globally):

Bash

npm install -g json-server
Start the Backend Server:
From the root of your project, run the following command to simulate the RESTful API:

Bash

json-server --watch db.json --port 3001
This command will start the server at http://localhost:3001 and watch for changes in your db.json file.

Open the Application in the Browser:
Open the index.html file directly in your web browser. It is recommended to use extensions like "Live Server" in VS Code for a smoother development experience.

🧪 Default Data (JSON Server)
The db.json file contains the following initial structure for users, allowing you to test the application immediately:

📄 License
This project is free to use for educational and personal purposes. If you use or modify it, I would appreciate a mention.

👨‍💻 Developed by Juan Quiroz66
