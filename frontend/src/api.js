// api.js - functions that call the backend REST API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Helper: parse the response and throw an Error if the status is not OK
async function handle(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

// GET /api/tasks
export const fetchTasks = () => fetch(API_URL).then(handle);

// POST /api/tasks
export const createTask = (title) =>
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then(handle);

// PUT /api/tasks/:id  (updates = { completed } and/or { title })
export const updateTask = (id, updates) =>
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).then(handle);

// DELETE /api/tasks/:id
export const deleteTask = (id) =>
  fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(handle);
