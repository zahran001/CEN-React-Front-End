import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RolePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, username } = location.state || {};

  const handleLoginRedirect = () => {
    navigate("/login", { state: { username, role } }); // Pass both username and role
  };  

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>
        Your role is: <strong>{role}</strong>
      </p>
      <button onClick={handleLoginRedirect}>Login</button>
    </div>
  );
};

export default RolePage;
