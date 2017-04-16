const express = require('express');
const path = require('path');
const portfinder = require('portfinder');

/**
 * options
 * port: port for the server to be started
 * appDir: directory containing the app
 * renderFile: html file to be rendered by ther server on every routes
 * logFile: name of log file where logs be mentioned
 */

module.exports = function(options) {
  const port = options.port || 8080;
  const appDir = options.appDir || 'app';
  const renderFile = options.renderFile || 'index.html';
  const logFile = options.logFile || 'react-server.log';
  const logLevel = options.logLevel || false;
  const server = express();
  const app = express();
  const log = require('./logger')(logLevel, logFile);

  // method to handle all the routes and re-direct to single render-file
  app.get('/', function(request, response) {
    response.sendFile(path.resolve(process.cwd(), appDir, renderFile), function(error) {
      if (error && error.status == 404) {
        log('ERROR: Render file specified does not exist in the specified App directory');
        response.status(404).send('App is in still development mode');
      } else {
        log('SUCCESS: Rendered ' + request.originalUrl + ' from host: ' + request.hostname + ':' + port);
      }
    });
  });

  // setting static files path
  server.use('/__assets', express.static(path.resolve(process.cwd(), appDir)));

  // setting to render app on all routes
  server.use('*', app);

  // method to check if port is already in use
  portfinder.basePort = port;
  portfinder.getPort(function(error, assignedPort) {
    if (assignedPort !== port) {
      log('ERROR: Specified port ('+ port +') is already in use');
      log('ADVICE: Next available port is ' + assignedPort + ' please retry the server with same');
      process.exit(1);
    } else {
      server.listen(port, function() {
        log('Server started at 127.0.0.1:' + port);
      });
    }
  });
}
