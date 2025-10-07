# Invoice ROI Genie

Invoice ROI Genie is a lightweight, single-page web application designed to help businesses calculate and visualize the potential cost savings and return on investment (ROI) when switching from a manual invoicing process to an automated one. The application allows users to input key business metrics, simulate outcomes, save and manage different scenarios, and generate a downloadable report.

# Hosted Links :
* **Frontend :** https://invoicing-roi-simulator-khaki.vercel.app
* **Backend :** https://invoicing-roi-simulator-hk31.onrender.com

  
# Screenshot
<p align="center">
  <img src="Asset/Screenshot 2025-10-07 215427.png" alt="screenshot" width="1000"/>
  <br>
</p>


## Table of Contents

* Features
* Tech Stack
* Project Structure
* API Endpoints
* Local Development Setup
* Deployment

## Features

* **Quick Simulation**: Instantly calculates monthly savings, payback period, and ROI based on user inputs.
* **Scenario Management**: Allows users to save, load, and delete named simulation scenarios for future reference.
* **Favorable Outcome Logic**: The backend contains internal constants and a bias factor to ensure that the results always demonstrate a positive financial benefit of automation.
* **Gated Report Generation**: Users can download a simple HTML report of their simulation results after providing an email address, simulating a lead-capture mechanism.

## Tech Stack

* **Frontend**: React (with Vite), Tailwind CSS
* **Backend**: Node.js, Express.js
* **Database**: Supabase (PostgreSQL)
* **Deployment**: Frontend hosted on Vercel, Backend hosted on Render.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

```
invoice-roi-genie/
├── backend/
│   ├── src/
│   │   ├── api.js          # All API logic, calculations, and DB interactions
│   │   ├── config/
│   │   │   └── supabaseClient.js
│   │   └── server.js       # Express server setup
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component with all logic and UI
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## API Endpoints

All API routes are prefixed with `/api`.

| Method   | Endpoint          | Description                                      |
|----------|-------------------|--------------------------------------------------|
| `POST`   | `/simulate`       | Runs a simulation and returns the calculated results. |
| `POST`   | `/scenarios`      | Saves a new scenario to the database.            |
| `GET`    | `/scenarios`      | Retrieves a list of all saved scenarios.         |
| `GET`    | `/scenarios/:id`  | Retrieves the details of a single scenario by its ID. |
| `DELETE` | `/scenarios/:id`  | Deletes a specific scenario by its ID.           |

## Local Development Setup

To run this project on your local machine, follow these steps.

### Prerequisites

* Node.js (v18 or later)
* npm
* A Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/Kamalesh0111/Invoicing-ROI-simulator.git
```

### 2. Configure the Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   * Create a Supabase project and set up the `scenarios` table as described in the project documentation.
   * Rename `.env.example` to `.env`.
   * Add your Supabase Project URL and Anon Key to the `.env` file:

```env
SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

4. Start the backend server:

```bash
npm start
```

The server will be running on `http://localhost:8080`.

### 3. Configure the Frontend

1. Navigate to the frontend directory (from the root):

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   * Rename `.env.example` to `.env`.
   * Add the backend API URL to the `.env` file:

```env
VITE_API_URL=http://localhost:8080/api
```

4. Start the frontend development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Deployment

This application is designed for easy deployment:

* The **backend** is hosted on Render, configured to use the `backend` directory.
* The **frontend** is hosted on Vercel, configured to use the `frontend` directory.

Environment variables for Supabase keys (on Render) and the backend API URL (on Vercel) must be set in their respective hosting dashboards for the live application to function correctly.
