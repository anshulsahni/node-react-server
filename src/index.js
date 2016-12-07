const express = require('express');
const path = require('path');
const log = require('./logger');

module.exports = function(options) {
  const ENV = options.env || 'development';
  const PORT = options.port || (ENV === 'development' ? 3000 : 8080);
  const APP_DIR = options.appDir || 'app';
  const RENDER_FILE = options.renderFile || 'index.html';
  const server = express();

  server.get('*', function(request, response) {
    response.sendFile(path.resolve(process.cwd(), APP_DIR, RENDER_FILE), function(error) {
      if (error.status == 404) {
        log('ERROR: Render file specified does not exist in the specified App directory');
        response.status(404).send('App is in still development mode');
      }
    });
  });

  server.listen(PORT, function() {
    log('Server started at 127.0.0.1:' + PORT);
  });
}
