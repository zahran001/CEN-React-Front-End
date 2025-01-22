import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentCourses = () => {
  const [courses, setCurrentCourses] = useState([]);  // Renamed state for clarity
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");
    
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/student/studentview`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentCourses(response.data.courses); // Assuming courses are in this format
        setName(response.data.name);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setErrorMessage("Could not fetch courses for the provided UID.");
      }
    };

    fetchCourses();
  }, [token]); // Re-fetch if the token changes
  
  return (
    <div>
      <h2>Hi {name}!</h2>
      <h2>Your Courses:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              {course.courseCode} - Grade: {course.grade} {/* Display course code and grade */}
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not registered for any courses.</p>
      )}
    </div>
  );
};

export default StudentCourses;