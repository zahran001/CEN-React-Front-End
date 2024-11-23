import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import RolePage from "./RolePage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import RegisterCourse from "./RegisterCourse";
import UpdateCourse from "./UpdateCourse";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/role" element={<RolePage />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register-course" element={<RegisterCourse />} />
      <Route path="/update-course/:courseId" element={<UpdateCourse />} />
    </Routes>
  </Router>
);

export default App;

