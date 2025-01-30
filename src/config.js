const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://register-backend-chi.vercel.app/'
    : 'http://localhost:5000'
};

export default config;