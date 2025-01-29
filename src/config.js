const config = {
    apiUrl: process.env.NODE_ENV === 'production'
      ? 'https://your-backend-domain.vercel.app'
      : 'http://localhost:5000'
  };
  
  export default config;