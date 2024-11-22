import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import RolePage from "./RolePage";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/role" element={<RolePage />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;

