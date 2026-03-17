import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://127.0.0.1:8000/tasks";

const Dashboard = () => {
  const username = localStorage.getItem("user");

  if (!username) {
    return <Navigate to="/" />;
  }

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    title: "",
    status: "Pending",
    priority: "Medium",
    dueDate: ""
  });

  const [editId, setEditId] = useState(null);

  // ✅ Load tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Add or Update task
  const handleAddOrUpdateTask = async () => {
    if (!taskInput.title.trim()) return;

    try {
      if (editId) {
        // UPDATE
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskInput)
        });
      } else {
        // CREATE
        await fetch(`${API_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskInput)
        });
      }

      fetchTasks(); // refresh list

      setTaskInput({
        title: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
      });

      setEditId(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      fetchTasks();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ✅ Edit
  const handleEdit = (task) => {
    setTaskInput(task);
    setEditId(task.id);
  };

  // ✅ Logout
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
            {editId ? "✏️ Edit Task" : "➕ Create New Task"}
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
                className={`btn w-100 ${editId ? "btn-warning" : "btn-success"}`}
              >
                {editId ? "Update" : "Add"}
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
                  <td colSpan="5">No tasks found</td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>

                    <td>
                      <span className={`badge ${
                        task.status === "Completed"
                          ? "bg-success"
                          : task.status === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}>
                        {task.status}
                      </span>
                    </td>

                    <td>
                      <span className={`badge ${
                        task.priority === "High"
                          ? "bg-danger"
                          : task.priority === "Medium"
                          ? "bg-primary"
                          : "bg-info text-dark"
                      }`}>
                        {task.priority}
                      </span>
                    </td>

                    <td>{task.dueDate || "N/A"}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(task)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(task.id)}
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