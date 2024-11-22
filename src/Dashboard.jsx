import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  // Check if the user is authenticated, if not redirect to login
  if (!authToken) {
    navigate("/login"); // Redirect to login if not authenticated
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
  };

  const handleGetAllCourses = () => {
    navigate("/courses"); // Replace with the actual route to get all courses
  };

  const handleRegisterCourse = () => {
    navigate("/register-course"); // Replace with the actual route to register a course
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <p>Login successful!</p>
      {/* <p>{authToken}</p> */}
      <p>
        Hello, <strong>{username}</strong>! You are logged in as a{" "}
        <strong>{role}</strong>.
      </p>

      {role === "staff" && (
        <div className="staff-actions">
          <button onClick={handleGetAllCourses}>Get All Courses</button>
          <button onClick={handleRegisterCourse}>Register a Course</button>
        </div>
      )}

      {/* <button className="register-link" onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
