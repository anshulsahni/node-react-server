var server = require('../src');

server({
  env: 'development',
  port: 3001,
  appDir: 'build',
});
