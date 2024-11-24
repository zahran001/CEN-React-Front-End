import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterStudents = () => {
  const [studentName, setStudentName] = useState("");
  const [studentUID, setStudentUID] = useState("");
  const [courses, setCourses] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No token found, please log in.");
    return;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the UID exists in the database
      // Register courses for the student
    //   await axios.post(`http://localhost:8080/api/users/students/${studentUID}/register-courses`, {
    //     name: studentName,
    //     courses: courses.split(",").map((course) => course.trim()),
    //   });
      await axios.post(`http://localhost:8080/api/users/students/${studentUID}/register-courses`, {
        name: studentName,
        courses: courses.split(",").map((course) => course.trim()),
      },
      {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      alert("Courses successfully registered for the student!");
      navigate("/dashboard"); // Redirect back to the dashboard
    } catch (error) {
      console.error("Error registering courses:", error);
      setErrorMessage(`An error occurred while registering the courses for UID: ${studentUID}`);    }
  };
  return (
    <div className="register-students-container">
      <h1>Register Students</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </label>
        <label>
          Student UID:
          <input
            type="text"
            value={studentUID}
            onChange={(e) => setStudentUID(e.target.value)}
            required
          />
        </label>
        <label>
          Courses (comma-separated):
          <input
            type="text"
            value={courses}
            onChange={(e) => setCourses(e.target.value)}
            required
          />
        </label>
        <button type="submit">Register Courses</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};
export default RegisterStudents;



// frontend for advisor adding courses
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";