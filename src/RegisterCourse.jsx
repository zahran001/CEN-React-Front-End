// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./RegisterCourse.css";

// const RegisterCourse = () => {
//   const navigate = useNavigate();
//   const authToken = localStorage.getItem("authToken");

//   const [courseDetails, setCourseDetails] = useState({
//     course_code: "",
//     title: "",
//     instructor_name: "",
//     credits: "",
//     semester: "",
//     year: "",
//     department: "",
//   });

//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleChange = (e) => {
//     setCourseDetails({
//       ...courseDetails,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api/courses/create",
//         courseDetails,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setSuccess("Course registered successfully!");
//       console.log("Response:", response.data);
//       // Optionally, navigate back to the dashboard or reset the form
//     //   navigate("/dashboard");
//     } catch (error) {
//       console.error("Error registering course:", error.response?.data || error.message);
//       setError(error.response?.data?.message || "Failed to register the course.");
//     }
//   };
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     navigate("/login"); // Redirect to login page
//   };

//   return (
//     <div className="register-course-container">
//       <h1>Register a New Course</h1>
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}

//       <form onSubmit={handleSubmit} className="register-course-form">
//         <div className="form-group">
//           <label htmlFor="course_code">Course Code:</label>
//           <input
//             type="text"
//             id="course_code"
//             name="course_code"
//             value={courseDetails.course_code}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="title">Title:</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={courseDetails.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="instructor_name">Instructor Name:</label>
//           <input
//             type="text"
//             id="instructor_name"
//             name="instructor_name"
//             value={courseDetails.instructor_name}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="credits">Credits:</label>
//           <input
//             type="number"
//             id="credits"
//             name="credits"
//             value={courseDetails.credits}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="semester">Semester:</label>
//           <input
//             type="text"
//             id="semester"
//             name="semester"
//             value={courseDetails.semester}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="year">Year:</label>
//           <input
//             type="number"
//             id="year"
//             name="year"
//             value={courseDetails.year}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="department">Department:</label>
//           <input
//             type="text"
//             id="department"
//             name="department"
//             value={courseDetails.department}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button type="submit" className="submit-button">
//           Register Course
//         </button>
//         <button
//           type="button"
//           className="cancel-button"
//           onClick={() => navigate("/dashboard")}
//         >
//           back
//         </button>
//       </form>

//       <p className="redirect-message">
//         <span className="logout-link" onClick={handleLogout}>
//           Logout
//         </span>
//       </p>
//     </div>
//   );
// };

// export default RegisterCourse;



// Sadaf
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterCourse.css";

const RegisterCourse = () => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [courseDetails, setCourseDetails] = useState({
    course_code: "",
    title: "",
    instructor_name: "",
    credits: "",
    semester: "",
    year: "",
    department: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleChange = (e) => {
    setCourseDetails({
      ...courseDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/staff/courses/create",
        courseDetails,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Course registered successfully!");
      console.log("Response:", response.data);
      // Optionally, navigate back to the dashboard or reset the form
    //   navigate("/dashboard");
    } catch (error) {
      console.error("Error registering course:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to register the course.");
    }
  };
  return (
    <div className="register-course-container">
      <h1>Register a New Course</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="register-course-form">
        <div className="form-group">
          <label htmlFor="course_code">Course Code:</label>
          <input
            type="text"
            id="course_code"
            name="course_code"
            value={courseDetails.course_code}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructor_name">Instructor Name:</label>
          <input
            type="text"
            id="instructor_name"
            name="instructor_name"
            value={courseDetails.instructor_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="credits">Credits:</label>
          <input
            type="number"
            id="credits"
            name="credits"
            value={courseDetails.credits}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <input
            type="text"
            id="semester"
            name="semester"
            value={courseDetails.semester}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={courseDetails.year}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={courseDetails.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Register Course
        </button>
        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/dashboard")}
        >
          back
        </button>
      </form>
    </div>
  );
};
export default RegisterCourse;