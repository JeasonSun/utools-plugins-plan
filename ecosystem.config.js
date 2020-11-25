module.exports = {
  apps : [{
    script: 'app.js',
    name: 'planlist'
  }],

  deploy : {
    production : {
      user : 'work',
      host : '140.143.151.77',
      ref  : 'origin/main',
      repo : 'https://github.com/JeasonSun/utools-plugins-plan.git',
      path : '/home/work/www/planlist/production',
      'pre-deploy-local': 'git fetch --al',
      'post-deploy' : 'cd app && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
