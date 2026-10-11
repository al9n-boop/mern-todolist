# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Course: 23CSB40B Web Technology, Assignment 2.

## Features
- Add, view, complete/uncomplete and delete tasks
- Data stored in MongoDB through a REST API (survives page refresh)
- Input validation (empty titles rejected with HTTP 400), proper status codes (201, 400, 404)
- CORS restricted to the frontend's address

## Project structure
```
backend/    Express server, Mongoose model, REST routes
frontend/   React app (TaskForm, TaskList, TaskItem components)
```

## API
| Method | Endpoint           | Description                          |
|--------|--------------------|--------------------------------------|
| GET    | /api/tasks         | Fetch all tasks                      |
| POST   | /api/tasks         | Add a task (`{ "title": "..." }`)    |
| PUT    | /api/tasks/:id     | Update `title` and/or `completed`    |
| DELETE | /api/tasks/:id     | Delete a task                        |

## Prerequisites
- Node.js 18+
- MongoDB (local install or a free MongoDB Atlas cluster)

## How to run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env     # then edit .env and set MONGO_URI
npm start
```
Environment variables (`backend/.env`):
- `MONGO_URI` - MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/todo`
- `PORT` - server port (default 5000)
- `FRONTEND_ORIGIN` - allowed CORS origin (default `http://localhost:3000`)

### 2. Frontend (in a second terminal)
```bash
cd frontend
npm install
npm start
```
Open http://localhost:3000. The frontend calls the API at `http://localhost:5000/api/tasks`
(override with `VITE_API_URL` if needed).

## Screenshots
Add your screenshots to a `screenshots/` folder:
- Adding a task
- Completing a task
- Deleting a task
- Merged pull requests (Pull requests -> Closed tab)

## Git workflow
- `feature/backend` and `feature/frontend` branches, each merged into `main` via a pull request
- `.env` and `node_modules` are excluded via `.gitignore`; `.env.example` lists the variable names
