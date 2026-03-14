import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [editIndex, setEditIndex] = useState(null); // track edit

  // Handle input change
  const handleChange = (e) => {
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value
    });
  };

  // Add or update task
  const handleAddOrUpdateTask = () => {
    if (taskInput.title === "") return;

    if (editIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskInput;
      setTasks(updatedTasks);
      setEditIndex(null); // reset edit mode
    } else {
      // Add new task
      setTasks([...tasks, taskInput]);
    }

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
    // If deleting the task currently being edited
    if (editIndex === index) {
      setTaskInput({
        title: "",
        status: "Pending",
        priority: "Medium",
        dueDate: ""
      });
      setEditIndex(null);
    }
  };

  // Edit task
  const handleEdit = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h2>Welcome to the Dashboard</h2>
        <h5 className="text-muted">Hello, {username} 👋</h5>
      </div>

      {/* Create / Edit Task Section */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3">{editIndex !== null ? "Edit Task" : "Create Task"}</h5>

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
              className={`btn ${editIndex !== null ? "btn-warning" : "btn-success"} w-100`}
            >
              {editIndex !== null ? "Update Task" : "Create Task"}
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
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
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