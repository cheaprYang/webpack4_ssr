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
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    },
     // max_memory_restart:500
  }],
  deploy : {
    production : {
      user : 'root',
      host : '207.148.66.211',
      ref  : 'origin/master',
      repo : 'git@github.com:cheaprYang/webpack4_ssr.git',
      path : '/var/www/webpack_demo',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
