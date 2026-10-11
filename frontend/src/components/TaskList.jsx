import TaskItem from "./TaskItem.jsx";

// Renders the list of tasks
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="muted">No tasks yet. Add one above!</p>;
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
