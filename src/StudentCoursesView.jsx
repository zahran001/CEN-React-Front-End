// // Frontend for viewing student details

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const StudentCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const username = localStorage.getItem("username");
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`/api/students/${username}/courses`);
//         setCourses(response.data.courses);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCourses();
//   }, [username]);
//   if (loading) {
//     return <p>Loading courses...</p>;
//   }
//   return (
//     <div>
//       <h2>Your Courses</h2>
//       {courses.length > 0 ? (
//         <ul>
//           {courses.map((course, index) => (
//             <li key={index}>{course}</li>
//           ))}
//         </ul>
//       ) : (
//         <p>You are not registered for any courses.</p>
//       )}
//     </div>
//   );
// };
// export default StudentCourses;


// Frontend for viewing student details
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentCourses = () => {
  const [courses, setCurrentCourses] = useState([]);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken");
    
  useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/users/student/studentview`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentCourses(response.data.courses); // Set courses in state
          setName(response.data.name);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setErrorMessage("Could not fetch courses for the provided UID.");
        }
      };

      fetchCourses(); 
  }, [token]); 

  return (
    <div>
      <h2>Hi {name}!</h2> 
      <h2>Your Courses:</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li> // Assuming `course` is a string or object with a `name`
          ))}
        </ul>
      ) : (
        <p>You are not registered for any courses.</p>
      )}
    </div>
  );
};

export default StudentCourses;