import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import RolePage from "./RolePage";
import Login from "./Login";
import Dashboard from "./Dashboard";
import RegisterStudents from "./RegisterStudents";
import DropCourses from "./DropCourses.jsx";
import StudentCourses from "./StudentCoursesView.jsx";
import RegisterCourse from "./RegisterCourse.jsx";
import InstructorCourses from "./InstructorCourseView.jsx";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/role" element={<RolePage />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Added paths for routing to the new pages */}
      <Route path="/register-courses" element={<RegisterStudents />} />
      <Route path="/drop-courses" element={<DropCourses />} />
      <Route path="/student-view" element={<StudentCourses/>} />
      <Route path="register-course" element={<RegisterCourse/>} />
      <Route path="/instructor-view" element={<InstructorCourses/>} />
    </Routes>
  </Router>

);

export default App;

