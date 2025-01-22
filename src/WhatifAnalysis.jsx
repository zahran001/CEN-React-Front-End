import React, { useState, useEffect } from "react";
import axios from "axios";

const gradeOptions = ["S","A", "B", "C", "D", "F", "U", "I"]; // Grade options dropdown

const WhatifAnalysis = () => {
  const [currentGPA, setCurrentGPA] = useState(null);
  const [newCourses, setNewCourses] = useState([{ grade: "", credits: "" }]);
  const [updatedGPA, setUpdatedGPA] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch initial GPA
  useEffect(() => {
    const fetchCurrentGPA = async () => {
      try {
        setError("");

        // Retrieve the token
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing. Please log in.");
        }

        // Make the API call to fetch current GPA
        const response = await axios.get(
          "http://localhost:8080/api/users/currentgpa",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentGPA(response.data.currentGPA);
      } catch (err) {
        const errorMessage =
          err.response?.data?.error || err.message || "Failed to fetch GPA.";
        setError(errorMessage);

        // Redirect to login if token is invalid/expired
        if (errorMessage.toLowerCase().includes("token")) {
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
        }
      }
    };

    fetchCurrentGPA();
  }, []);

  const handleAddCourse = () => {
    setNewCourses([...newCourses, { grade: "", credits: "" }]);
  };

  const handleRemoveCourse = (index) => {
    setNewCourses(newCourses.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedCourses = [...newCourses];
    updatedCourses[index][field] = value;
    setNewCourses(updatedCourses);
  };

  const calculateNewGPA = async () => {
    try {
      setError("");
      setLoading(true);

      // Retrieve the token
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token is missing. Please log in.");
      }

      // Make the API call with the token
      const response = await axios.post(
        "http://localhost:8080/api/users/whatifanalysis",
        {
          newCourses: newCourses.map((course) => ({
            grade: course.grade,
            credits: parseInt(course.credits, 10),
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUpdatedGPA(response.data.updatedGPA);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || err.message || "Something went wrong.";
      setError(errorMessage);

      // Redirect to login if token is invalid/expired
      if (errorMessage.toLowerCase().includes("token")) {
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect to login page
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="whatif-analysis-container">
      <h1>What-If Analysis</h1>
      <p>Calculate the effect of adding new courses on your GPA.</p>

      {error && <p className="error-message">{error}</p>}

      {currentGPA !== null && (
        <div className="current-gpa">
          <h3>Current GPA:</h3>
          <p>{Number(currentGPA).toFixed(2)}</p>
        </div>
      )}

      <div className="courses-input">
        <h2>Add Expected Courses</h2>
        {newCourses.map((course, index) => (
          <div key={index} className="course-row">
            <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) => handleInputChange(index, "name", e.target.value)}
            />
            <select
              value={course.grade}
              onChange={(e) => handleInputChange(index, "grade", e.target.value)}
            >
              <option value="">Select Grade</option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Credits"
              value={course.credits}
              onChange={(e) =>
                handleInputChange(index, "credits", e.target.value)
              }
              min="1"
            />
            {index > 0 && (
              <button onClick={() => handleRemoveCourse(index)}>Remove</button>
            )}
          </div>
        ))}
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      <button
        className="calculate-button"
        onClick={calculateNewGPA}
        disabled={loading}
      >
        {loading ? "Calculating..." : "Calculate GPA"}
      </button>

      {updatedGPA !== null && (
        <div className="gpa-result">
          <h3>Expected GPA:</h3>
          <p>{updatedGPA.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default WhatifAnalysis;
