import React from "react";

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="row">
      {tasks.map((task) => (
        <div key={task._id} className="col-md-4 mb-3">
          <div
            className="card"
            style={{
              backgroundColor: task.completed ? "#d4edda" : "white",
              color: task.completed ? "#155724" : "black",
            }}
          >
            <div className="card-body">
              <h5 className="card-title">{task.title}</h5>
              {task.description && (
                <p className="card-text">{task.description}</p>
              )}
              <p className="card-text">
                <span
                  className={`badge ${
                    task.completed ? "bg-success" : "bg-warning"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </p>
              <button
                className={`btn btn-sm ${
                  task.completed ? "btn-warning" : "btn-success"
                } me-2`}
                onClick={() =>
                  updateTask(task._id, { ...task, completed: !task.completed })
                }
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
