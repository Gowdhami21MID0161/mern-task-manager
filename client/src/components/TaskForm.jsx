import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      completed: false,
    };

    addTask(newTask);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
