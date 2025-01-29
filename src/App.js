// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import StudentDashboard from './components/StudentDashboard';
// import GuardDashboard from './components/GuardDashboard';
// import { AuthProvider, useAuth } from './context/AuthContext';

// const PrivateRoute = ({ children, allowedRole }) => {
//   const { user } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (user.type !== allowedRole) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route 
//             path="/student/*" 
//             element={
//               <PrivateRoute allowedRole="student">
//                 <StudentDashboard />
//               </PrivateRoute>
//             } 
//           />
//           <Route 
//             path="/guard/*" 
//             element={
//               <PrivateRoute allowedRole="guard">
//                 <GuardDashboard />
//               </PrivateRoute>
//             } 
//           />
//           <Route path="/" element={<Navigate to="/login" />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;







// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import Login from './components/Login';
// import StudentDashboard from './components/StudentDashboard';
// import GuardDashboard from './components/GuardDashboard';
// import PrivateRoute from './components/PrivateRoute';
// import { ThemeProvider } from './context/ThemeContext';
// import Navbar from './components/Navbar';

// function App() {
//   return (
//     <ThemeProvider>
//       <AuthProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
//             <Navbar />
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route
//                 path="/student/"
//                 element={
//                   <PrivateRoute allowedRole="student">
//                     <StudentDashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/guard/"
//                 element={
//                   <PrivateRoute allowedRole="guard">
//                     <GuardDashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route path="/" element={<Navigate to="/login" />} />
//             </Routes>
//           </div>
//         </Router>
//       </AuthProvider>
//     </ThemeProvider>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import GuardDashboard from './components/GuardDashboard';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/student/"
                element={
                  <PrivateRoute allowedRole="student">
                    <StudentDashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/guard/"
                element={
                  <PrivateRoute allowedRole="guard">
                    <GuardDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

