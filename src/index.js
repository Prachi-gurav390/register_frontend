// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App';

// console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
ReactDOM.createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <App />
  </GoogleOAuthProvider>
);
