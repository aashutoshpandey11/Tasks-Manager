import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const username = localStorage.getItem("user");

  if (!username) {
    return <Navigate to="/" />;
  }

  // Load tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [taskInput, setTaskInput] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    dueDate: ""
  });

  const [editIndex, setEditIndex] = useState(null);

  // Save tasks to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle input
  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    });
  };

  // Add or update task
  const handleAddOrUpdateTask = () => {
    if (!taskInput.title.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = taskInput;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, taskInput]);
    }

    setTaskInput({
      title: "",
      status: "Pending",
      priority: "Medium",
      dueDate: ""
    });
  };

  // Delete
  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);

    if (editIndex === index) {
      setEditIndex(null);
      setTaskInput({
        title: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
      });
    }
  };

  // Edit
  const handleEdit = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">

      {/* Header */}
      <div className="bg-dark text-white p-4 rounded shadow mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-1">Dashboard</h3>
          <p className="mb-0">Welcome back, <strong>{username}</strong> 👋</p>
        </div>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Total Tasks</h6>
            <h3>{tasks.length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Completed</h6>
            <h3>{tasks.filter(t => t.status === "Completed").length}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 text-center p-3">
            <h6>Pending</h6>
            <h3>{tasks.filter(t => t.status !== "Completed").length}</h3>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card shadow border-0 mb-4">
        <div className="card-body">
          <h5 className="mb-3">
            {editIndex !== null ? "✏️ Edit Task" : "➕ Create New Task"}
          </h5>

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
                onClick={handleAddOrUpdateTask}
                className={`btn w-100 ${
                  editIndex !== null ? "btn-warning" : "btn-success"
                }`}
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h5 className="mb-3">📋 Task List</h5>

          <table className="table align-middle text-center">
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

                    <td>
                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "bg-success"
                            : task.status === "In Progress"
                            ? "bg-warning text-dark"
                            : "bg-secondary"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          task.priority === "High"
                            ? "bg-danger"
                            : task.priority === "Medium"
                            ? "bg-primary"
                            : "bg-info text-dark"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>

                    <td>{task.dueDate || "N/A"}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
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
    </div>
  );
};

export default Dashboard;