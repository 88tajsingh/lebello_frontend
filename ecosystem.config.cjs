module.exports = {
  apps: [
    {
      name: 'vue-app-dev',   // Name of your application
      script: 'npm',         // Use npm to run the script
      args: 'run dev',       // Command to run your development script
      cwd: '/var/www/html/lebello_frontend', // Directory where your project is located
      instances: 1,          // Number of instances to run (1 for development)
      autorestart: true,     // Automatically restart the app if it crashes
      watch: false,          // Do not watch for file changes in development
      max_memory_restart: '1G', // Restart if the process uses more than 1 GB of memory
      env: {
        NODE_ENV: 'development', // Environment variable for development
      },
      log_file: '/var/log/vue-app-dev.log', // Log file location
      out_file: '/var/log/vue-app-dev-out.log', // Standard output log
      error_file: '/var/log/vue-app-dev-error.log', // Error log file
      pid_file: '/var/run/vue-app-dev.pid', // PID file
    },
  ],
};

