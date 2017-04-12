const yargs = require('yargs');
const server = require('./server.js');

const argv = yargs
              .usage('Usage: $0 <options>')
              .alias('p', 'port')
              .alias('r', 'render-file')
              .alias('a', 'app-dir')
              .alias('l', 'log-file')
              .argv;

server({
  port: argv.port,
  renderFile: argv['render-file'],
  appDir: argv['app-dir'],
  logFile: argv['log-file'],
});
