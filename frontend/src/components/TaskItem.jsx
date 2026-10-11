// A single task: checkbox, title (struck through when completed) and delete button
export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task)}
      />
      <span className={task.completed ? "title done" : "title"}>
        {task.title}
      </span>
      <button className="delete" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </li>
  );
}
