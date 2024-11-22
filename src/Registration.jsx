import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";

const Registration = () => {
  const [formData, setFormData] = useState({
    uid: "",
    username: "",
    password: "",
    department: "CSE",
    role: "student",
    major: "",
  });

  const majorsByDepartment = {
    CSE: ["CS", "CE", "IT", "CyS"],
    BME: ["BME"],
    ME: ["ME"],
  };

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData
      );
      setMessage("User registered successfully!");
      navigate("/role", {
        state: { role: formData.role, username: formData.username },
      });
    } catch (error) {
      setMessage("Error registering user. Please try again.");
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/login", {
      state: { username: formData.username, role: formData.role },
    });
  };

  return (
    <div className="registration-container">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          UID:
          <input
            type="text"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Department:
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="CSE">CSE</option>
            <option value="BME">BME</option>
            <option value="ME">ME</option>
          </select>
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="advisor">Advisor</option>
            <option value="staff">Staff</option>
          </select>
        </label>

        {(formData.role === "student" || formData.role === "advisor") && (
          <label>
            Major:
            <select name="major" value={formData.major} onChange={handleChange}>
              <option value="">Select a Major</option>
              {majorsByDepartment[formData.department].map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="submit">Register</button>
      </form>
      {message && <p className="message">{message}</p>}

      <p className="redirect-message">
        Already have an account?{" "}
        <span className="login-link" onClick={handleRegisterRedirect}>
          Login!
        </span>
      </p>
    </div>
  );
};

export default Registration;
