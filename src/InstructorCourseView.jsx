// Frontend for viewing instructor details
import React, { useEffect, useState } from "react";
import axios from "axios";
const InstructorCourses = () => {
  const [courses, setCurrentCourses] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");
    
  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/users/instructor/instructorview`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentCourses(response.data.courses); // Set courses in state
          console.log(courses);
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setErrorMessage("Could not fetch courses for the provided UID.");
        }
      };
      fetchCourses(); 
  }, [token]); 
  return (
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Your Courses</h2>
      <ul>
        {courses.map((course, index) => (
          <li key={index}>
            <strong>{course.title}</strong> ({course.course_code}) - {course.credits} credits, {course.semester} {course.year}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default InstructorCourses;