import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ReportPortal = () => {
  const location = useLocation();
  const authToken = location.state?.authToken;
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async (endpoint) => {
    setLoading(true); // Show loading indicator
    try {
      const response = await axios.get(
        `http://localhost:8080/reports/${endpoint}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setReports(response.data); // Store the report data in state
      setSelectedReport(endpoint); // Track which report is being displayed
    } catch (error) {
      console.error("Error fetching report:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Hide loading indicator after the request is complete
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Report Portal</h1>
      <p>Welcome to the Report Portal! Select a report to view details.</p>

      {/* Buttons to fetch specific reports */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => fetchReport("major-gpa")}
          style={buttonStyle}
        >
          Major GPA Stats
        </button>
        <button
          onClick={() => fetchReport("department-gpa")}
          style={buttonStyle}
        >
          Department GPA Stats
        </button>
        <button
          onClick={() => fetchReport("course-enrollment")}
          style={buttonStyle}
        >
          Course Enrollment Stats
        </button>
        <button
          onClick={() => fetchReport("instructor-students")}
          style={buttonStyle}
        >
          Instructor Student Stats
        </button>
        <button
          onClick={() => fetchReport("students-by-major")}
          style={buttonStyle}
        >
          Students by Major
        </button>
      </div>

      {/* Show loading indicator */}
      {loading && <div style={loadingStyle}>Loading...</div>}

      {/* Display the fetched report */}
      <div>
        <h2>{selectedReport ? `Report: ${selectedReport}` : "No Report Selected"}</h2>
        
        {/* Display report data in a formatted way */}
        {reports.length > 0 ? (
          <div style={reportContainerStyle}>
            <pre style={reportDataStyle}>
              {JSON.stringify(reports, null, 2)}
            </pre>
          </div>
        ) : (
          !loading && <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

// Styles for the layout
const buttonStyle = {
  padding: "10px 20px",
  margin: "5px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const loadingStyle = {
  fontSize: "18px",
  color: "#ff9800",
  fontWeight: "bold",
};

const reportContainerStyle = {
  marginTop: "20px",
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const reportDataStyle = {
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  fontSize: "14px",
  backgroundColor: "#fff",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
};

export default ReportPortal;

