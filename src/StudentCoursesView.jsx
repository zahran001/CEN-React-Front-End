import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/students/${username}/courses`);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [username]);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div>
      <h2>Your Courses</h2>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      ) : (
        <p>You are not registered for any courses.</p>
      )}
    </div>
  );
};

export default StudentCourses;
