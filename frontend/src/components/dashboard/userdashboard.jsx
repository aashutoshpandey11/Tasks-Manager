import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  // Example username (later from backend)
  const [username] = useState("Ashutosh");

  // Task state
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    dueDate: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    });
  };

  // Add task
  const handleAddTask = () => {
    if (taskInput.title === "") return;

    setTasks([...tasks, taskInput]);

    setTaskInput({
      title: "",
      status: "Pending",
      priority: "Medium",
      dueDate: ""
    });
  };

  // Delete task
  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div className="container mt-5">

      {/* Welcome Section */}
      <div className="text-center mb-4">
        <h2>Welcome to the Dashboard</h2>
        <h5 className="text-muted">Hello, {username} 👋</h5>
      </div>

      {/* Create Task Section */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">Create Task</h5>

        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              name="title"
              value={taskInput.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Task Name"
            />
          </div>

          <div className="col-md-2">
            <select
              name="status"
              value={taskInput.status}
              onChange={handleChange}
              className="form-select"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="col-md-2">
            <select
              name="priority"
              value={taskInput.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="date"
              name="dueDate"
              value={taskInput.dueDate}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="col-md-2">
            <button
              onClick={handleAddTask}
              className="btn btn-success w-100"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Task Table */}
      <div className="card p-3 shadow-sm">
        <h5 className="mb-3">Your Tasks</h5>

        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>Task</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5">No tasks created</td>
              </tr>
            ) : (
              tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.title}</td>
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;