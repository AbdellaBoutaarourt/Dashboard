# Dashboard Project

This project is a student management dashboard that allows users to view and manage subjects, classes, and students. The dashboard provides an interface to interact with student data, including displaying subjects, selecting classes, adding points to students, and removing students from specific subjects. The data is fetched from a backend API, and the frontend is built with React.

## Features

- **Login Authentication:** Teachers must log in to access the dashboard and manage students.
- **View Classes:** View students in specific classes and filter by selected subject.
- **Student Management:** Add or remove students from subjects and classes.
- **Dynamic Filtering:** Search and filter students by name and enrolled subjects.
- **Confirm Deletion:** When removing a student from a subject, a confirmation modal is displayed to prevent accidental deletion.
- **Add/Update Student Grades (Points):** Add or update grades for students in specific subjects.
- **Responsive Design:** The dashboard is responsive and works on multiple screen sizes.

## Technologies Used

- **Frontend:** React, Chart.js (for data visualization), Tailwind CSS (for styling), React Router (for routing)
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

## Setup Instructions

Follow these steps to set up the project on your local machine.

### Prerequisites

- **Node.js and npm**
- **React**
- **Supabase account**: You need a Supabase account for the database and authentication service. Sign up at [supabase.io](https://supabase.io/).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdellaBoutaarourt/Dashboard.git
   cd https://github.com/AbdellaBoutaarourt/Dashboard.git

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install

3. **Install frontend dependencies:**
   ```bash
   cd ../prototype-dashboard
   npm install

4. **Configure Supabase Connection:**
   - In the backend directory, create a .env file and add following environment variables:
   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key

6. **Run Backend Server:**
   ```bash
   cd ../backend
   node server.js
7. **Run Frontend Server:**
   ```bash
   cd ../prototype-dashboard
   npm start

8. **Access the Application: Open http://localhost:3000 in your web browser.**

## Folder Structure

### `backend/`
- `server.js`: Main server file for backend logic.
- `.env`: Environment variables for the backend configuration.

### `prototype-dashboard/`
- `public/`
- `src/`
  - `pages/`
  - `App.css`
  - `App.js`
  - `index.css`
  - `index.js`
  - `README.md`
  - `tailwind.config.js`
### `README.md`



## SOURCES

### Frontend

- **Chart.js Documentation**
  Explore the official documentation for integrating and customizing charts with [Chart.js](https://www.chartjs.org/docs/latest/getting-started/).

- **Tailwind CSS Installation Guide**
  Learn how to install and set up [Tailwind CSS](https://tailwindcss.com/docs/installation) for styling your project.

- **Tailwind CSS Full Documentation**
  Comprehensive guide on using [Tailwind CSS](https://tailwindcss.com/docs) for utility-first CSS styling, including examples and configuration.

### Backend

- **Supabase JavaScript SDK**
  Official documentation for installing and using [Supabase's JavaScript SDK](https://supabase.com/docs/reference/javascript/installing), which powers the backend and authentication.

- **Express.js Basic Routing**
  Learn about basic routing and middleware setup with [Express.js](https://expressjs.com/en/starter/basic-routing.html) for building your API.

- **React Router Documentation**
   documentation for [React Router](https://reactrouter.com/en/main/router-components/browser-router) browser-router.


### YouTube Tutorials

- **Chart.js Tutorial**
  - A YouTube tutorial that covers the basics of using [Chart.js for data visualization](https://www.youtube.com/watch?v=ZpfseYy5Hxg).
  -  Introduction To ChartJS,[React ChartJS Tutorial](https://m.youtube.com/watch?v=RF57yDglDfE).
  - Integrate Chart.js Using [React with Data from a REST API](https://m.youtube.com/watch?v=yOousFGfmZc).

### ChatGPT Contributions

 -  [ChatGPT responses](https://chatgpt.com/share/673b9b7c-4358-8008-8b5b-1e1d4f190415) that helps for the add point feature.
 -  A useful [ChatGPT responses](https://chatgpt.com/share/673b9dee-b6dc-8008-bb37-3613d2aa9fa5) To store the data you into Supabase.

