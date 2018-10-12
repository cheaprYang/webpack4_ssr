module.exports = {
  apps : [{
    name      : 'app',
    script    : './server/index.js',
    node_args : "--harmony",
    "error_file"      : "/var/logs/err.log",
    "out_file"        : "/var/logs/out.log",
    "pid_file"        : "/var/pid/app.pid",
    "merge_logs"      : true,
    "log_date_format" : "YYYY-MM-DD HH:mm Z",
    "watch": true,
    "watch_options": {
        "usePolling": true
    },
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    },
     // max_memory_restart:500
  }]
};
