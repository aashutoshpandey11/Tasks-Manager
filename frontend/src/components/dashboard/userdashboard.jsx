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

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    });
  };

  const handleAddOrUpdateTask = async () => {
    if (!taskInput.title.trim()) return;

    try {
      if (editId) {
        await fetch(`${API_URL}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskInput)
        });
      } else {
        await fetch(`${API_URL}/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(taskInput)
        });
      }

      fetchTasks();
      setTaskInput({
        title: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
      });
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTaskInput(task);
    setEditId(task.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
      
      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#1e293b",
        padding: "20px"
      }}>
        <h4 className="text-white">Task Manager</h4>
        <hr style={{ borderColor: "#334155" }} />

        <p className="mt-4">Dashboard</p>
        <p>Tasks</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-4">

        {/* HEADER */}
        <div style={{
          background: "linear-gradient(135deg, #3b82f6, #6366f1)",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between"
        }}>
          <div>
            <h4>Dashboard</h4>
            <p>Welcome back, <strong>{username}</strong> 👋</p>
          </div>
          <button className="btn btn-light" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* STATS */}
        <div className="row mb-4">
          {[
            { title: "Total Tasks", value: tasks.length },
            { title: "Completed", value: tasks.filter(t => t.status === "Completed").length },
            { title: "Pending", value: tasks.filter(t => t.status !== "Completed").length }
          ].map((item, index) => (
            <div className="col-md-4" key={index}>
              <div style={{
                background: "#1e293b",
                padding: "20px",
                borderRadius: "15px",
                textAlign: "center",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
              }}>
                <h6>{item.title}</h6>
                <h3>{item.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* FORM */}
        <div style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "20px"
        }}>
          <h5>{editId ? "Edit Task" : "Create Task"}</h5>

          <div className="row g-3 mt-2">
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
              <select name="status" value={taskInput.status} onChange={handleChange} className="form-select">
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            <div className="col-md-2">
              <select name="priority" value={taskInput.priority} onChange={handleChange} className="form-select">
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
                style={{
                  background: "#3b82f6",
                  border: "none",
                  color: "white",
                  width: "100%",
                  borderRadius: "10px"
                }}
                className="btn"
              >
                {editId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "15px"
        }}>
          <h5>Task List</h5>

          <table className="table mt-3 text-center" style={{ color: "#e2e8f0" }}>
            <thead style={{ background: "#334155" }}>
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
                      <span className="badge bg-secondary">{task.status}</span>
                    </td>

                    <td>
                      <span className="badge bg-info text-dark">{task.priority}</span>
                    </td>

                    <td>{task.dueDate || "N/A"}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-light me-2"
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