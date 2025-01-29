// // components/Login.js
// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [userType, setUserType] = useState('');
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [registrationData, setRegistrationData] = useState({
//     name: '',
//     rollNumber: '',
//     contactNumber: '',
//     batchNumber: '',
//     roomNumber: ''
//   });
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleRegistrationSubmit = async (googleData) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/auth/${userType}/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           token: googleData.credential,
//           // guardData:registrationData,
//           // studentData: registrationData
//           ...(userType === 'guard'
//             ? { guardData: registrationData }
//             : { studentData: registrationData })
//         }),
//       });

//       if (response.ok) {
//         // After registration, proceed with login
//         handleLogin(googleData);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error('Registration error:', error);
//       alert('Registration failed');
//     }
//   };

//   const handleLogin = async (googleData) => {
//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//           token: googleData.credential,
//           type: userType
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login(data.user);
//         navigate(`/${userType}`);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       alert('Login failed');
//     }
//   };

//   const renderRegistrationForm = () => (
//     <div className="registration-form">
//       <h2>Register as {userType}</h2>
//       <form onSubmit={(e) => e.preventDefault()}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={registrationData.name}
//           onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
//         />
//         {userType === 'student' && (
//           <>
//             <input
//               type="text"
//               placeholder="Roll Number"
//               value={registrationData.rollNumber}
//               onChange={(e) => setRegistrationData({ ...registrationData, rollNumber: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Batch Number"
//               value={registrationData.batchNumber}
//               onChange={(e) => setRegistrationData({ ...registrationData, batchNumber: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Room Number"
//               value={registrationData.roomNumber}
//               onChange={(e) => setRegistrationData({ ...registrationData, roomNumber: e.target.value })}
//             />
//           </>
//         )}
//         <input
//           type="tel"
//           placeholder="Contact Number"
//           value={registrationData.contactNumber}
//           onChange={(e) => setRegistrationData({ ...registrationData, contactNumber: e.target.value })}
//         />
//         <GoogleLogin
//           onSuccess={handleRegistrationSubmit}
//           onError={() => alert('Google Sign In failed')}
//         />
//       </form>
//     </div>
//   );

//   return (
//     <div className="login-container">
//       <h1>Campus Entry/Exit Management System</h1>

//       {!userType && (
//         <div className="user-type-selection">
//           <button onClick={() => setUserType('student')}>For Students</button>
//           <button onClick={() => setUserType('guard')}>For Guards/Staff</button>
//         </div>
//       )}

//       {userType && !showRegistration && (
//         <div className="login-options">
//           <button onClick={() => setShowRegistration(true)}>Create Account</button>
//           <div className="login-divider">or</div>
//           <GoogleLogin
//             onSuccess={handleLogin}
//             onError={() => alert('Google Sign In failed')}
//           />
//           <button onClick={() => setUserType('')} className="back-button">
//             Back
//           </button>
//         </div>
//       )}

//       {userType && showRegistration && renderRegistrationForm()}
//     </div>
//   );
// };

// export default Login;





import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import config from '../config';

const Login = () => {
  const [userType, setUserType] = useState('');
  const [showRegistration, setShowRegistration] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    rollNumber: '',
    contactNumber: '',
    batchNumber: '',
    roomNumber: ''
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRegistrationSubmit = async (googleData) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/auth/${userType}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: googleData.credential,
          ...(userType === 'guard' ? { guardData: registrationData } : { studentData: registrationData })
        }),
      });

      if (response.ok) {
        handleLogin(googleData);
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    }
  };

  const handleLogin = async (googleData) => {
    try {
      const response = await fetch(`${config.apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          token: googleData.credential,
          type: userType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        navigate(`/${userType}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  const renderRegistrationForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid  bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl text-center font-bold mb-4 text-gray-800 dark:text-white">Register as {userType}</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={registrationData.name}
          onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        {userType === 'student' && (
          <>
            <input
              type="text"
              placeholder="Roll Number"
              value={registrationData.rollNumber}
              onChange={(e) => setRegistrationData({ ...registrationData, rollNumber: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Batch Number"
              value={registrationData.batchNumber}
              onChange={(e) => setRegistrationData({ ...registrationData, batchNumber: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Room Number"
              value={registrationData.roomNumber}
              onChange={(e) => setRegistrationData({ ...registrationData, roomNumber: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </>
        )}
        <input
          type="tel"
          placeholder="Contact Number"
          value={registrationData.contactNumber}
          onChange={(e) => setRegistrationData({ ...registrationData, contactNumber: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <div className="w-full grid justify-center">
          <GoogleLogin
            onSuccess={handleRegistrationSubmit}
            onError={() => alert('Google Sign In failed')}
          />
        </div>
      </form>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-800 p-4 md:p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Campus Entry/Exit Management System</h1>

        {!userType && (
          <div className="grid grid-rows-2 gap-4">
            <button
              onClick={() => setUserType('student')}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              For Students
            </button>
            <button
              onClick={() => setUserType('guard')}
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              For Guards/Staff
            </button>
          </div>
        )}

        {userType && !showRegistration && (
          <div className="grid gap-4 ">
            <button
              onClick={() => setShowRegistration(true)}
              className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Create Account
            </button>
            <div className="text-center text-gray-600 dark:text-gray-400">or</div>
            <div className="w-full grid justify-center">
              <GoogleLogin
                type="standard"
                width="100%"
                onSuccess={handleLogin}
                onError={() => alert('Google Sign In failed')}
                useOneTap
              />
            </div>
            <button
              onClick={() => setUserType('')}
              className="w-full p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          </div>
        )}

        {userType && showRegistration && renderRegistrationForm()}
      </motion.div>
    </div>
  );
};

export default Login;

