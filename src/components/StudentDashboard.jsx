// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useTheme } from '../context/ThemeContext'
// import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
// import config from '../config';

// const StudentDashboard = () => {
//   const [logs, setLogs] = useState([]);
//   const [location, setLocation] = useState('');
//   const { user, logout, login } = useAuth();
//   const navigate = useNavigate();
//   const [isProfileVisible, setIsProfileVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isEditing1, setIsEditing1] = useState(false);
//   const [tempContactNumber, setTempContactNumber] = useState(user.contactNumber);
//   const [tempRoomNumber, setTempRoomNumber] = useState(user.roomNumber);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/logs/student/${user.id}`);
//       const data = await response.json();
//       setLogs(data);
//     } catch (error) {
//       console.error('Error fetching logs:', error);
//     }
//   };

//   const requestOuting = async () => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/logs/request-out`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           studentId: user.id,
//           location,
//         }),
//       });

//       if (response.ok) {
//         setLocation('');
//         fetchLogs();
//       } else {
//         alert('Failed to create outing request');
//       }
//     } catch (error) {
//       console.error('Error creating outing request:', error);
//     }
//   };

//   const requestReturn = async (logId) => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/logs/request-in/${logId}`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         fetchLogs();
//       } else {
//         alert('Failed to create return request');
//       }
//     } catch (error) {
//       console.error('Error creating return request:', error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/students/${user.id}`, {
//         method: "PATCH",
//         credentials: 'include',
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ contactNumber: tempContactNumber, roomNumber: tempRoomNumber }),
//       });

//       if (response.ok) {
//         const updatedStudent = await response.json();
//         login({
//           ...user,
//           contactNumber: updatedStudent.contactNumber,
//           roomNumber: updatedStudent.roomNumber,
//         });
//         setIsEditing1(false);
//         setIsEditing(false);
//       } else {
//         console.error("Failed to update contact number");
//       }
//     } catch (error) {
//       console.error("Error updating contact number:", error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
//       <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
//         <div className="flex items-center space-x-4">
//           <div className=''>
//             <button
//               onClick={toggleTheme}
//               className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none "
//             >
//               {theme === "dark" ? <FaSun className='h-[1.5rem] w-[1.5rem]' /> : <FaMoon className='h-[1.4rem] w-[1.4rem]' />}
//             </button>
//           </div>
//           <button onClick={() => setIsProfileVisible(!isProfileVisible)} className="px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition-colors">
//             {isProfileVisible ? 'Hide Profile' : 'View Profile'}
//           </button>
//           <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition-colors">Logout</button>
//         </div>
//       </header>

//       <main className="container mx-auto mt-8 p-4">
//       {/* <AnimatePresence> */}
//         {isProfileVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className={`mb-8 p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
//           >
//             <h2 className="text-xl font-bold mb-4">Profile</h2>
//             <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
//               <div>Name: {user.name}</div>
//               <div>Email: {user.email}</div>
//               <div>Roll no: {user.rollNumber}</div>
//               <div>
//                 Contact no:{" "}
//                 {isEditing1 ? (
//                   <>
//                     <input
//                       value={tempContactNumber}
//                       onChange={(e) => setTempContactNumber(e.target.value)}
//                       className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
//                     />
//                     <button onClick={handleSave} className="ml-2 px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors">Save</button>
//                     <button
//                       onClick={() => {
//                         setIsEditing1(false);
//                         setTempContactNumber(user.contactNumber);
//                       }}
//                       className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {user.contactNumber}
//                     <button onClick={() => setIsEditing1(true)} className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors">Edit</button>
//                   </>
//                 )}
//               </div>
//               <div>Batch: {user.batchNumber}</div>
//               <div>
//                 Room no:{" "}
//                 {isEditing ? (
//                   <>
//                     <input
//                       value={tempRoomNumber}
//                       onChange={(e) => setTempRoomNumber(e.target.value)}
//                       className={`p-1 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-black'}`}
//                     />
//                     <button onClick={handleSave} className="ml-2 px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors">Save</button>
//                     <button
//                       onClick={() => {
//                         setIsEditing(false);
//                         setTempRoomNumber(user.roomNumber);
//                       }}
//                       className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     {user.roomNumber}
//                     <button onClick={() => setIsEditing(true)} className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors">Edit</button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//           {/* </AnimatePresence> */}

//         <section className="mb-8">
//           <h2 className="text-xl font-bold mb-4">Request Outing</h2>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Enter location"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               className={`flex-grow p-2 rounded ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
//             />
//             <button onClick={requestOuting} className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors">Submit Request</button>
//           </div>
//         </section>

//         <section>
//           <h2 className="text-xl font-bold mb-4">Your Logs</h2>
//           <div className={`overflow-x-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
//             <table className="w-full table-auto">
//               <thead className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
//                 <tr>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Location</th>
//                   <th className="px-4 py-2">Out Time</th>
//                   <th className="px-4 py-2">Out Status</th>
//                   <th className="px-4 py-2">In Time</th>
//                   <th className="px-4 py-2">In Status</th>
//                   {/* <th className="px-4 py-2">Action</th> */}
//                 </tr>
//               </thead>
//               <tbody className='text-center'>
//                 {logs.map((log) => (
//                   <tr key={log._id} className={`${theme === 'dark' ? 'border-b border-gray-700' : 'border-b'}`}>
//                     <td className="px-4 py-2">{new Date(log.outTime).toLocaleDateString()}</td>
//                     <td className="px-4 py-2">{log.location}</td>
//                     <td className="px-4 py-2">{new Date(log.outTime).toLocaleString()}</td>
//                     <td className="px-4 py-2">{log.outApproval.status}</td>
//                     <td className="px-4 py-2">{log.inTime ? new Date(log.inTime).toLocaleString() : '-'}</td>
//                     <td className="px-4 py-2">{log.inTime ? log.inApproval.status : '-'}</td>
//                     {/* <td className="px-4 py-2"> */}
//                     {!log.inTime && log.outApproval.status === 'approved' && (
//                       <button
//                         onClick={() => requestReturn(log._id)}
//                         className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
//                       >
//                         Request Return
//                       </button>
//                     )}
//                     {/* </td> */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import config from "../config";

const StudentDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [location, setLocation] = useState("");
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing1, setIsEditing1] = useState(false);
  const [tempContactNumber, setTempContactNumber] = useState(
    user.contactNumber
  );
  const [tempRoomNumber, setTempRoomNumber] = useState(user.roomNumber);
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/logs/student/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        navigate("/login");
      }
      console.error("Error fetching logs:", error);
    }
  };

  const requestOuting = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/logs/request-out`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          studentId: user.id,
          location,
        }),
      });

      if (response.ok) {
        setLocation("");
        fetchLogs();
      } else {
        alert("Failed to create outing request");
      }
    } catch (error) {
      console.error("Error creating outing request:", error);
    }
  };

  const requestReturn = async (logId) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/logs/request-in/${logId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchLogs();
      } else {
        alert("Failed to create return request");
      }
    } catch (error) {
      console.error("Error creating return request:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/students/${user.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          contactNumber: tempContactNumber,
          roomNumber: tempRoomNumber,
        }),
      });

      if (response.ok) {
        const updatedStudent = await response.json();
        login({
          ...user,
          contactNumber: updatedStudent.contactNumber,
          roomNumber: updatedStudent.roomNumber,
        }, token);
        setIsEditing1(false);
        setIsEditing(false);
      } else {
        console.error("Failed to update contact number");
      }
    } catch (error) {
      console.error("Error updating contact number:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <div className="flex items-center space-x-4">
          <div className="">
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none "
            >
              {theme === "dark" ? (
                <FaSun className="h-[1.5rem] w-[1.5rem]" />
              ) : (
                <FaMoon className="h-[1.4rem] w-[1.4rem]" />
              )}
            </button>
          </div>
          <button
            onClick={() => setIsProfileVisible(!isProfileVisible)}
            className="px-4 py-2 bg-green-500 rounded hover:bg-green-700 transition-colors"
          >
            {isProfileVisible ? "Hide Profile" : "View Profile"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8 p-4">
        {/* <AnimatePresence> */}
        {isProfileVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mb-8 p-4 rounded-lg shadow-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Profile</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>Name: {user.name}</div>
              <div>Email: {user.email}</div>
              <div>Roll no: {user.rollNumber}</div>
              <div>
                Contact no:{" "}
                {isEditing1 ? (
                  <>
                    <input
                      value={tempContactNumber}
                      onChange={(e) => setTempContactNumber(e.target.value)}
                      className={`p-1 rounded ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <button
                      onClick={handleSave}
                      className="ml-2 px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing1(false);
                        setTempContactNumber(user.contactNumber);
                      }}
                      className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {user.contactNumber}
                    <button
                      onClick={() => setIsEditing1(true)}
                      className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
              <div>Batch: {user.batchNumber}</div>
              <div>
                Room no:{" "}
                {isEditing ? (
                  <>
                    <input
                      value={tempRoomNumber}
                      onChange={(e) => setTempRoomNumber(e.target.value)}
                      className={`p-1 rounded ${
                        theme === "dark"
                          ? "bg-gray-700 text-white"
                          : "bg-gray-100 text-black"
                      }`}
                    />
                    <button
                      onClick={handleSave}
                      className="ml-2 px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setTempRoomNumber(user.roomNumber);
                      }}
                      className="ml-2 px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    {user.roomNumber}
                    <button
                      onClick={() => setIsEditing(true)}
                      className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
        {/* </AnimatePresence> */}

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Request Outing</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`flex-grow p-2 rounded ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
            />
            <button
              onClick={requestOuting}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              Submit Request
            </button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Your Logs</h2>
          <div
            className={`overflow-x-auto ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } rounded-lg shadow`}
          >
            <table className="w-full table-auto">
              <thead
                className={` ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Out Time</th>
                  <th className="px-4 py-2">Out Status</th>
                  <th className="px-4 py-2">In Time</th>
                  <th className="px-4 py-2">In Status</th>
                  {/* <th className="px-4 py-2">Action</th> */}
                </tr>
              </thead>
              <tbody className="text-center">
                {logs.map((log) => (
                  <tr
                    key={log._id}
                    className={`${
                      theme === "dark" ? "border-b border-gray-700" : "border-b"
                    }`}
                  >
                    <td className="px-4 py-2">
                      {new Date(log.outTime).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{log.location}</td>
                    <td className="px-4 py-2">
                      {new Date(log.outTime).toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{log.outApproval.status}</td>
                    <td className="px-4 py-2">
                      {log.inTime ? new Date(log.inTime).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-2">
                      {log.inTime ? log.inApproval.status : "-"}
                    </td>
                    {/* <td className="px-4 py-2"> */}
                    {!log.inTime && log.outApproval.status === "approved" && (
                      <button
                        onClick={() => requestReturn(log._id)}
                        className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                      >
                        Request Return
                      </button>
                    )}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
