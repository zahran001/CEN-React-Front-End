import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import
import "./Dashboard.css";
import StudentCourses from "./StudentCoursesView";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const [courses, setCourses] = useState([]);

  // Check if the user is authenticated, if not redirect to login
  if (!authToken) {
    navigate("/login"); // Redirect to login if not authenticated
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
  };

  const handleGetAllCourses = async () => {
    // Mark this function as async
    try {
      // Make a POST request to your backend API
      const response = await axios.get(
        "http://localhost:8080/api/courses/view/",
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Pass the auth token in the headers
          },
        }
      );
      // Update state with the retrieved courses
      console.log(response.data);
      setCourses(response.data);
    } catch (error) {
      console.error(
        "Error fetching courses:",
        error.response?.data || error.message
      );
    }
  };

  const handleRegisterCourse = () => {
    navigate("/register-course"); // route to register a course
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/courses/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Course deleted successfully.");
      // Refresh the courses list
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== courseId)
      );
    } catch (error) {
      console.error(
        "Error deleting course:",
        error.response?.data || error.message
      );
      alert("Failed to delete the course.");
    }
  };

  const handleUpdateCourse = (courseId) => {
    navigate(`/update-course/${courseId}`); // Navigate to the update form with the course ID
  };

  const handleRegisterStudents = () => {
    navigate("/register-courses");
  };

  const handleDropCourse = () =>{
    navigate("/drop-courses");
  }
  const handleGetDetails = () =>{
    navigate("/student-view");
  }
  const handleInstructorGetDetails = () =>{
    navigate("/instructor-view");
  }

  const [logs, setLogs] = useState([]);

  const handleViewLogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/logs", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLogs(response.data); // Store logs in state
    } catch (error) {
      console.error(
        "Error fetching logs:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard!</h1>
      <p>Login successful!</p>
      <p>
        Hello, <strong>{username}</strong>! You are logged in as a{" "}
        <strong>{role}</strong>.
      </p>

      {role === "staff" && (
        <div className="staff-actions">
          <button onClick={handleGetAllCourses}>Get All Courses</button>
          <button onClick={handleRegisterCourse}>Register a Course</button>
          <button onClick={handleViewLogs}>View Logs</button>
        </div>
      )}

      {/* Display the list of courses */}
      {courses.length > 0 ? (
        <div className="courses-container">
          <h2>Courses:</h2>
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Credits</th>
                <th>Semester</th>
                <th>Year</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.course_code}</td>
                  <td>{course.title}</td>
                  <td>{course.instructor_name}</td>
                  <td>{course.credits}</td>
                  <td>{course.semester}</td>
                  <td>{course.year}</td>
                  <td>{course.department}</td>
                  <td>
                    <button
                      className="update-button"
                      onClick={() => handleUpdateCourse(course._id)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCourse(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Click "Get All Courses" to load and update courses.</p>
      )}

      {logs.length > 0 && (
        <div className="logs-container">
          <h2>Logs:</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>
                <strong>User:</strong> {log.user} | <strong>Role:</strong>{" "}
                {log.role} | <strong>Operation:</strong> {log.operationType} |{" "}
                <strong>Timestamp:</strong>{" "}
                {new Date(log.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/*If role is advisor, show these two buttons*/}
      {role === "advisor" && (
        <div className="advisor-actions">
          <button onClick={handleRegisterStudents}>Register Courses</button>
          <button onClick={handleDropCourse}>Drop Courses</button>
        </div>
      )}
      {/* {role === "student" && (
        <div className="student-view">
          <h2>Your Courses</h2>
          <StudentCourses />
        </div>
      )} */}

       {/*If role is student, show the Get Your Details button*/}
       {role === "student" && (
        <div className="student-actions">
          <button onClick={handleGetDetails}>Get Your Details</button>
        </div>
      )}


      {/*If role is instructor, show the Get Your Details button*/}
      {role === "instructor" && (
        <div className="instructor-actions">
          <button onClick={handleInstructorGetDetails}>Get Your Details</button>
        </div>
      )}

      <p className="redirect-message">
        <span className="logout-link" onClick={handleLogout}>
          Logout
        </span>
      </p>
    </div>
  );
};

export default Dashboard;
