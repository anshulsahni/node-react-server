const yargs = require('yargs');

const server = require('./server.js');

const argv = yargs
              .usage('Usage: $0 <options>')
              .alias('p', 'port')
              .describe('p', 'Port on which server should be started and files are served')
              .alias('r', 'render-file')
              .describe('r', '.html file which will be sent as response by the server')
              .alias('a', 'app-dir')
              .describe('a', 'Directory name in from in which file render file resides - relative to cwd()')
              .alias('l', 'log-file')
              .describe('l', 'Log file in which logs will be recored')
              .alias('o', 'log-level')
              .describe('o', 'Log level, this decides the target for logs')
              .help('h')
              .alias('h', 'help')
              .describe('h', 'Show help related to react-server')
              .argv;

server({
  port: argv.port,
  renderFile: argv['render-file'],
  appDir: argv['app-dir'],
  logFile: argv['log-file'],
  logLevel: argv['log-level'],
});
