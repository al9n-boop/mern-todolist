import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all tasks from the backend once, when the page loads
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Add a task: POST to the backend, then add the saved task to state
  const addTask = async (title) => {
    try {
      setError("");
      const newTask = await createTask(title);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle complete/incomplete: PUT to the backend, then replace the task in state
  const toggleTask = async (task) => {
    try {
      setError("");
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a task: DELETE on the backend, then remove it from state
  const removeTask = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm onAdd={addTask} />
      {error && <p className="error">{error}</p>}
      {loading ? (
        <p className="muted">Loading...</p>
      ) : (
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={removeTask} />
      )}
    </div>
  );
}
