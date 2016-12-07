const express = require('express');
const path = require('path');
const portfinder = require('portfinder');


module.exports = function(options) {
  const ENV = options.env || 'development';
  const PORT = options.port || (ENV === 'development' ? 3000 : 8080);
  const APP_DIR = options.appDir || 'app';
  const RENDER_FILE = options.renderFile || 'index.html';
  const server = express();
  const log = require('./logger')(ENV);

  // method to handle all the routes and re-direct to single render-file
  server.get('*', function(request, response) {
    response.sendFile(path.resolve(process.cwd(), APP_DIR, RENDER_FILE), function(error) {
      if (error.status == 404) {
        log('ERROR: Render file specified does not exist in the specified App directory');
        response.status(404).send('App is in still development mode');
      }
    });
  });

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
