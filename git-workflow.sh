#!/usr/bin/env bash
# git-workflow.sh - creates the branches and commits needed for Part C.
# Run from the project root (todo-mern/) AFTER creating an empty public repo on GitHub.
# Usage: bash git-workflow.sh https://github.com/<your-username>/<repo>.git
set -e
REPO_URL="$1"
[ -z "$REPO_URL" ] && { echo "Usage: bash git-workflow.sh <repo-url>"; exit 1; }

git init -b main
git add .gitignore README.md
git commit -m "Add README and .gitignore"
git remote add origin "$REPO_URL"
git push -u origin main

# ---- Backend branch ----
git checkout -b feature/backend
git add backend/package.json backend/.env.example
git commit -m "Initialise backend project and add .env.example"
git add backend/models
git commit -m "Add Task model"
git add backend/server.js
git commit -m "Add Express server with MongoDB connection and restricted CORS"
git add backend/routes
git commit -m "Add GET, POST, PUT and DELETE task endpoints with validation"
git push -u origin feature/backend

echo ">>> Now open a pull request for feature/backend on GitHub and MERGE it into main."
read -p "Press Enter after merging... "

git checkout main
git pull origin main

# ---- Frontend branch ----
git checkout -b feature/frontend
git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/src/main.jsx
git commit -m "Create React app with Vite"
git add frontend/src/api.js
git commit -m "Add API helper functions"
git add frontend/src/components
git commit -m "Add TaskForm, TaskList and TaskItem components"
git add frontend/src/App.jsx frontend/src/App.css
git commit -m "Connect App to backend and add styling"
git add -A
git diff --cached --quiet || git commit -m "Add remaining files"
git push -u origin feature/frontend

echo ">>> Now open a pull request for feature/frontend and MERGE it into main."
