//import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const addTask = async (task) => {
    await axios.post(API_URL, task);
    fetchTasks();
  };

  // Update task
  const updateTask = async (id, updatedTask) => {
    await axios.put(`${API_URL}/${id}`, updatedTask);
    fetchTasks();
  };

  // Delete task
  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
