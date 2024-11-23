import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./UpdateCourse.css";

const UpdateCourse = () => {
  const { courseId } = useParams(); // Get the courseId from the URL
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const [courseData, setCourseData] = useState({
    course_code: "",
    title: "",
    credits: 0,
    department: "",
    semester: "",
    year: 2024,
    instructor_name: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  // Fetch the current course data when the component loads
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/courses/view-single/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        console.log(response.data);
        setCourseData(response.data);
      } catch (err) {
        setError("Error fetching course data.");
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchCourseData();
  }, [courseId, authToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8080/api/courses/update/${courseId}`,
        courseData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(`/dashboard`); // Redirect to the dashboard after successful update
    } catch (err) {
      setError("Error updating course.");
    }
  };

  if (loading) return <p>Loading course details...</p>; // Show loading message while fetching
  if (error) return <p className="error-message">{error}</p>; // Display error message if any

  return (
    <div className="update-course-container">
      <h2>Update Course</h2>

      <form className="update-course-form" onSubmit={handleUpdateCourse}>
        <label htmlFor="course_code">Course Code</label>
        <input
          type="text"
          id="course_code"
          name="course_code"
          value={courseData.course_code}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="credits">Credits</label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={courseData.credits}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          value={courseData.department}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="semester">Semester</label>
        <input
          type="text"
          id="semester"
          name="semester"
          value={courseData.semester}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="year">Year</label>
        <input
          type="number"
          id="year"
          name="year"
          value={courseData.year}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="instructor_name">Instructor Name</label>
        <input
          type="text"
          id="instructor_name"
          name="instructor_name"
          value={courseData.instructor_name}
          onChange={handleInputChange}
          required
        />

        <div className="form-actions">
          <button type="submit">Update Course</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourse;
