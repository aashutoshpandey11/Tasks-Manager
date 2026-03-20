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

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      console.log("Fetched tasks:", data);
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
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

  // ✅ Add or Update Task (FIXED)
  const handleAddOrUpdateTask = async () => {
    if (!taskInput.title.trim()) {
      alert("Task title is required");
      return;
    }

    // 🔥 IMPORTANT FIX
    const payload = {
      ...taskInput,
      dueDate: taskInput.dueDate ? taskInput.dueDate : null
    };

    console.log("Sending payload:", payload);

    try {
      let res;

      if (editId) {
        res = await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${API_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      // ✅ Check response
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert("Error saving task");
        return;
      }

      const data = await res.json();
      console.log("Saved task:", data);

      // Refresh list
      fetchTasks();

      // Reset form
      setTaskInput({
        title: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
      });

      setEditId(null);

    } catch (error) {
      console.error("Save error:", error);
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
    setTaskInput({
      ...task,
      dueDate: task.dueDate || ""
    });
    setEditId(task.id);
  };

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Welcome To The DashBoard, {username}</h3>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Form */}
      <div className="card p-3 mb-4">
        <h5>{editId ? "Edit Task" : "Add Task"}</h5>

        <div className="row g-2">
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
              className="btn btn-primary w-100"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card p-3">
        <h5>Task List</h5>

        <table className="table mt-3">
          <thead>
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
                  <td>{task.status}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate || "N/A"}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
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
  );
};

export default Dashboard;