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
  const PORT = options.port || 8080;
  const APP_DIR = options.appDir || 'app';
  const RENDER_FILE = options.renderFile || 'index.html';
  const LOG_FILE = options.logFile || 'react-server.log';
  const logStatus = options.log;
  const server = express();
  const app = express();
  const log = require('./logger')(logStatus, LOG_FILE);

  // method to handle all the routes and re-direct to single render-file
  app.get('/', function(request, response) {
    response.sendFile(path.resolve(process.cwd(), APP_DIR, RENDER_FILE), function(error) {
      if (error && error.status == 404) {
        log('ERROR: Render file specified does not exist in the specified App directory');
        response.status(404).send('App is in still development mode');
      } else {
        log('SUCCESS: Rendered ' + request.originalUrl + ' from host: ' + request.hostname + ':' + PORT);
      }
    });
  });

  // setting static files path
  server.use('/__assets', express.static(path.resolve(process.cwd(), APP_DIR)));

  // setting to render app on all routes
  server.use('*', app);

  // method to check if port is already in use
  portfinder.basePort = PORT;
  portfinder.getPort(function(error, assignedPort) {
    if (assignedPort !== PORT) {
      log('ERROR: Specified port ('+ PORT +') is already in use');
      log('ADVICE: Next available port is ' + assignedPort + ' please retry the server with same');
      process.exit(1);
    } else {
      server.listen(PORT, function() {
        log('Server started at 127.0.0.1:' + PORT);
      });
    }
  });
}
