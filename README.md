# Site Status Checker

A sleek and modern tool to check the status of any website or IP address. It provides instant results. This application is built with a React frontend and a Python Flask backend.

---

## Features

* Check the status of any domain or IP address.
* Provides details like IP address, response time, and server location.
* Responsive design for both desktop and mobile use.
* Clear, color-coded results for "Up" or "Down" status.

---

## Technologies Used

* **Frontend**: React, Vite, Tailwind CSS
* **Backend**: Python, Flask

---

## Installation and Usage

### Prerequisites

* Node.js and npm
* Python 3 and pip

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment (recommended):**
    ```bash
    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate

    # For Windows
    python -m venv venv
    .\venv\Scripts\activate
    ```

3.  **Install the required Python packages:**
    ```bash
    pip install -r requirements.txt
    ```
    This will install Flask, Requests, and Flask-CORS.

4.  **Run the backend server:**
    ```bash
    python app.py
    ```
    The backend will be running at `http://127.0.0.1:5000`.

### Frontend Setup

1.  **Navigate to the project's root directory.**

2.  **Install the necessary npm packages:**
    ```bash
    npm install
    ```
    This will install React, ReactDOM, and other development dependencies specified in `package.json`.

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible in your browser, typically at `http://localhost:5173`.