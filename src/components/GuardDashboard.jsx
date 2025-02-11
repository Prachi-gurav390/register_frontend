// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useTheme } from "../context/ThemeContext";
// import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
// import config from "../config";

// const GuardDashboard = () => {
//   const [logs, setLogs] = useState([]);
//   const [view, setView] = useState("pending");
//   const { user, logout, login } = useAuth();
//   const [searchStudent, setSearchStudent] = useState("");
//   const [isProfileVisible, setIsProfileVisible] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [tempContactNumber, setTempContactNumber] = useState(
//     user.contactNumber
//   );
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     fetchLogs();
//   }, [view]);

//   const fetchLogs = async () => {
//     try {
//       let endpoint;
//       if (view === "pending") {
//         endpoint = `${config.apiUrl}/api/logs/pending`;
//       } else if (view === "all") {
//         endpoint = `${config.apiUrl}/api/logs/all`;
//       } else {
//         endpoint = `${config.apiUrl}/api/logs/outside`;
//       }
//       const response = await fetch(endpoint);
//       const data = await response.json();
//       setLogs(data);
//     } catch (error) {
//       console.error("Error fetching logs:", error);
//     }
//   };

//   const approveRequest = async (logId, type) => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/logs/approve/${logId}`,{
//           method: "PATCH",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             guardId: user.id,
//             type,
//           }),
//         });

//       if (response.ok) {
//         fetchLogs();
//       } else {
//         alert("Failed to approve request");
//       }
//     } catch (error) {
//       console.error("Error approving request:", error);
//     }
//   };

//   const searchStudentId = async () => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/logs/all`);
//       if (!response.ok) {
//         alert("Failed to fetch logs");
//         return;
//       }

//       const data = await response.json();
//       const filteredLogs = data.filter(
//         (log) => log.student.rollNumber === searchStudent
//       );

//       if (filteredLogs.length === 0) {
//         alert("No logs found for the given roll number");
//       }

//       setLogs(filteredLogs);
//     } catch (error) {
//       console.error("Error fetching logs:", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`${config.apiUrl}/api/guards/${user.id}`, {
//         method: "PATCH",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ contactNumber: tempContactNumber }),
//       });

//       if (response.ok) {
//         const updatedGuard = await response.json();
//         login({
//           ...user,
//           contactNumber: updatedGuard.contactNumber,
//         });
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
//     navigate("/login");
//   };

//   return (
//     <div
//       className={`min-h-screen ${
//         theme === "dark"
//           ? "bg-gray-900 text-white"
//           : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <header className="bg-slate-700 text-white p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Guard Dashboard</h1>
//         <div className="flex space-x-2">
//           <div className="">
//             <button
//               onClick={toggleTheme}
//               className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none "
//             >
//               {theme === "dark" ? (
//                 <FaSun className="h-[1.5rem] w-[1.5rem]" />
//               ) : (
//                 <FaMoon className="h-[1.4rem] w-[1.4rem]" />
//               )}
//             </button>
//           </div>
//           <button
//             onClick={() => setIsProfileVisible(!isProfileVisible)}
//             className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition-colors"
//           >
//             {isProfileVisible ? "Hide Profile" : "View Profile"}
//           </button>
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 transition-colors"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto mt-8 p-4">
//          {/* <AnimatePresence> */}
//         {isProfileVisible && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className={`mb-8 p-4 rounded-lg shadow-lg ${
//               theme === "dark" ? "bg-gray-800" : "bg-white"
//             }`}
//           >
//             <h2 className="text-xl font-bold mb-4">Profile</h2>
//             <div className="grid grid-cols-2 gap-4">
//               <div>Name: {user.name}</div>
//               <div>Email: {user.email}</div>
//               <div>
//                 Contact no:{" "}
//                 {isEditing ? (
//                   <>
//                     <input
//                       value={tempContactNumber}
//                       onChange={(e) => setTempContactNumber(e.target.value)}
//                       className={`p-1 rounded ${
//                         theme === "dark"
//                           ? "bg-gray-700 text-white"
//                           : "bg-gray-100 text-black"
//                       }`}
//                     />
//                     <button
//                       onClick={handleSave}
//                       className="ml-2 px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => {
//                         setIsEditing(false);
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
//                     <button
//                       onClick={() => setIsEditing(true)}
//                       className="ml-2 px-2 py-1 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
//                     >
//                       Edit
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//          {/* </AnimatePresence> */}
//         <div className="mb-8 flex justify-between items-center">
//           <select
//             value={view}
//             onChange={(e) => setView(e.target.value)}
//             className={`p-2 rounded ${
//               theme === "dark"
//                 ? "bg-gray-700 text-white"
//                 : "bg-white text-black"
//             }`}
//           >
//             <option value="pending">Pending Requests</option>
//             <option value="all">All Logs</option>
//             <option value="outside">Outside campus</option>
//           </select>
//           <div className="flex space-x-2">
//             <input
//               type="text"
//               placeholder="Enter student id"
//               value={searchStudent}
//               onChange={(e) => setSearchStudent(e.target.value)}
//               className={`p-2 rounded ${
//                 theme === "dark"
//                   ? "bg-gray-700 text-white"
//                   : "bg-white text-black"
//               }`}
//             />
//             <button
//               onClick={searchStudentId}
//               className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//         <div
//           className={`overflow-x-auto ${
//             theme === "dark" ? "bg-gray-800" : "bg-white"
//           } rounded-lg shadow`}
//         >
//           <table className="w-full table-auto">
//             <thead
//               className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
//             >
//               <tr>
//                 <th className="px-4 py-2">Date</th>
//                 <th className="px-4 py-2">Student Name</th>
//                 <th className="px-4 py-2">Roll No</th>
//                 <th className="px-4 py-2">Room No</th>
//                 <th className="px-4 py-2">Contact</th>
//                 <th className="px-4 py-2">Location</th>
//                 <th className="px-4 py-2">Out Time</th>
//                 <th className="px-4 py-2">Out Status</th>
//                 <th className="px-4 py-2">In Time</th>
//                 <th className="px-4 py-2">In Status</th>
//                 {/* <th className="px-4 py-2">Actions</th> */}
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               {logs.map((log) => (
//                 <tr
//                   key={log._id}
//                   className={`${
//                     theme === "dark" ? "border-b border-gray-700" : "border-b"
//                   }`}
//                 >
//                   <td className="px-4 py-2">
//                     {new Date(log.outTime).toLocaleDateString()}
//                   </td>
//                   <td className="px-4 py-2">{log.student.name}</td>
//                   <td className="px-4 py-2">{log.student.rollNumber}</td>
//                   <td className="px-4 py-2">{log.student.roomNumber}</td>
//                   <td className="px-4 py-2">{log.student.contactNumber}</td>
//                   <td className="px-4 py-2">{log.location}</td>
//                   <td className="px-4 py-2">
//                     {new Date(log.outTime).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-2">
//                     {log.outApproval.status === "pending" ? (
//                       <button
//                         onClick={() => approveRequest(log._id, "out")}
//                         className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
//                       >
//                         Approve Out
//                       </button>
//                     ) : (
//                       `Approved by ${log.outApproval.guard.name}`
//                     )}
//                   </td>
//                   <td className="px-4 py-2">
//                     {log.inTime ? new Date(log.inTime).toLocaleString() : "-"}
//                   </td>
//                   <td className="px-4 py-2">
//                     {log.inTime && log.inApproval.status === "pending" ? (
//                       <button
//                         onClick={() => approveRequest(log._id, "in")}
//                         className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
//                       >
//                         Approve In
//                       </button>
//                     ) : log.inTime ? (
//                       `Approved by ${log.inApproval.guard?.name || "-"}`
//                     ) : (
//                       "-"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default GuardDashboard;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import config from "../config";

const GuardDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [view, setView] = useState("pending");
  const { user, logout, login } = useAuth();
  const [searchStudent, setSearchStudent] = useState("");
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempContactNumber, setTempContactNumber] = useState(
    user.contactNumber
  );
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const firstName = user.name.split(" ")[0];
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchLogs();
  }, [view]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchLogs = async () => {
    try {
      let endpoint;
      if (view === "pending") {
        endpoint = `${config.apiUrl}/api/logs/pending`;
      } else if (view === "all") {
        endpoint = `${config.apiUrl}/api/logs/all`;
      } else {
        endpoint = `${config.apiUrl}/api/logs/outside`;
      }
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const approveRequest = async (logId, type) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/api/logs/approve/${logId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            guardId: user.id,
            type,
          }),
        }
      );

      if (response.ok) {
        fetchLogs();
      } else {
        alert("Failed to approve request");
      }
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const searchStudentId = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/logs/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        alert("Failed to fetch logs");
        return;
      }

      const data = await response.json();
      const filteredLogs = data.filter(
        (log) => log.student.rollNumber === searchStudent
      );

      if (filteredLogs.length === 0) {
        alert("No logs found for the given roll number");
      }

      setLogs(filteredLogs);
    } catch (error) {
      console.error("Error fetching logs:", error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/guards/${user.id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contactNumber: tempContactNumber }),
      });

      if (response.ok) {
        const updatedGuard = await response.json();
        login(
          {
            ...user,
            contactNumber: updatedGuard.contactNumber,
          },
          token
        );
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
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center relative menu-container">
        <h1 className="text-2xl font-bold">Guard Dashboard</h1>
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
          >
            {theme === "dark" ? (
              <FaSun className="h-6 w-6" />
            ) : (
              <FaMoon className="h-6 w-6" />
            )}
          </button>
          <button
            onClick={() => setIsProfileVisible(!isProfileVisible)}
            className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-700 transition-colors"
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
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-slate-600 transition-colors"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full right-0 mt-2 mr-2 w-fit bg-slate-700 rounded-lg shadow-xl z-50"
            >
              <div className="flex flex-col items-center p-2 space-y-2">
                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 text-left rounded hover:bg-slate-600 transition-colors"
                >
                  {theme === "dark" ? "Light Theme" : "Dark Theme"}
                </button>
                <button
                  onClick={() => {
                    setIsProfileVisible(!isProfileVisible);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 text-left rounded hover:bg-slate-600 transition-colors"
                >
                  {isProfileVisible ? "Hide Profile" : "View Profile"}
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-left rounded hover:bg-slate-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <main className="container mx-auto mt-8 p-4">
        <AnimatePresence>
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
                <div>
                  Contact no:{" "}
                  {isEditing ? (
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
                          setIsEditing(false);
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
        </AnimatePresence>
        <div className="mb-8 flex flex-col md:flex-row  items-start md:justify-between md:items-center gap-2 md:gap-0">
          <div>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className={`p-2 rounded ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
            >
              <option value="pending">Pending Requests</option>
              <option value="all">All Logs</option>
              <option value="outside">Outside campus</option>
            </select>
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter student id"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
              className={`p-2 rounded ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-white text-black"
              }`}
            />
            <button
              onClick={searchStudentId}
              className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
        <div
          className={`overflow-x-auto ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          } rounded-lg shadow`}
        >
          <table className="w-full table-auto">
            <thead
              className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
            >
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Roll No</th>
                <th className="px-4 py-2">Room No</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Out Time</th>
                <th className="px-4 py-2">Out Status</th>
                <th className="px-4 py-2">In Time</th>
                <th className="px-4 py-2">In Status</th>
                {/* <th className="px-4 py-2">Actions</th> */}
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
                  <td className="px-4 py-2">{log.student.name}</td>
                  <td className="px-4 py-2">{log.student.rollNumber}</td>
                  <td className="px-4 py-2">{log.student.roomNumber}</td>
                  <td className="px-4 py-2">{log.student.contactNumber}</td>
                  <td className="px-4 py-2">{log.location}</td>
                  <td className="px-4 py-2">
                    {new Date(log.outTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {log.outApproval.status === "pending" ? (
                      <button
                        onClick={() => approveRequest(log._id, "out")}
                        className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                      >
                        Approve Out
                      </button>
                    ) : (
                      `Approved by ${log.outApproval.guard.name}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {log.inTime ? new Date(log.inTime).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-2">
                    {log.inTime && log.inApproval.status === "pending" ? (
                      <button
                        onClick={() => approveRequest(log._id, "in")}
                        className="px-2 py-1 bg-green-500 rounded hover:bg-green-600 transition-colors"
                      >
                        Approve In
                      </button>
                    ) : log.inTime ? (
                      `Approved by ${log.inApproval.guard?.name || "-"}`
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default GuardDashboard;
