module.exports = {

  apps: [

    // BACKEND API
    {
      name: 'backend-coop-api',
      script: './backend/server.js',

      watch: true,

      env: {
        NODE_ENV: 'development'
      }
    },



    // FRONTEND BACKEND (BFF)
    {
      name: 'frontend-backend',

      script: './frontend/frontend-backend/server.js',

      watch: true,

      env: {
        NODE_ENV: 'development'
      }
    }

  ]
};