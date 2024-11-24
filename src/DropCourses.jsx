// frontend for advisor dropping courses 
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DropCourses = () => {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentUID, setStudentUID] = useState("");
  const [currentCourses, setCurrentCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");
  console.log("Token:", token);
  if (!token) {
    console.error("No token found, please log in.");
    return;
  }
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/student/${studentUID}/courses`,
        {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        }
      );
      setCurrentCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setErrorMessage("Could not fetch courses for the provided UID.");
    }
  };
  const handleCheckboxChange = (course) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/users/student/${studentUID}/drop-courses`, {
        courses: selectedCourses,
      },
      {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    });
      alert("Courses successfully dropped for the student!");
      setCurrentCourses((prev) => prev.filter((course) => !selectedCourses.includes(course)));
      setSelectedCourses([]); // Reset selection
    } catch (error) {
      console.error("Error dropping courses:", error);
      setErrorMessage("An error occurred while dropping the selected courses.");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="drop-courses-container">
      <h1>Drop Courses</h1>
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
        <button type="button" onClick={fetchCourses}>
          Fetch Courses
        </button>
        {currentCourses.length > 0 && (
          <div className="courses-list">
            <h2>Current Courses</h2>
            {currentCourses.map((course) => (
              <div key={course}>
                <label>
                  <input
                    type="checkbox"
                    value={course}
                    onChange={() => handleCheckboxChange(course)}
                  />
                  {course}
                </label>
              </div>
            ))}
          </div>
        )}
        {currentCourses.length > 0 && (
          <button type="submit">Drop Selected Courses</button>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>

      <p className="redirect-message">
        <span className="logout-link" onClick={handleLogout}>
          Logout
        </span>
      </p>

    </div>
  );
};
export default DropCourses;