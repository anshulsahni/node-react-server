const fs = require('fs');
const constants = require('./constants.js');

const pad = function(val) {
  return (String(val).length == 1 ? '0' : '') + val;
};

const timestamp = function() {
  const date = new Date();
  return date.getFullYear() + '-' + pad((date.getMonth() + 1)) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
};

const stampWithTime = function(message) {
  return timestamp() + ' - ' + message;
};

const logIntoFile = function(message, logFile) {
  fs.appendFile(logFile, message, function(error) {
    if (error) {
      console.log(stampWithTime('ERROR: Writing to log file operation failed'));
    }
  })
};

module.exports = function(environment, logFile) {
  return function(message) {
    if (environment === constants.DEVELOPMENT) {
      console.log(stampWithTime(message));
    } else if (environment === constants.PRODUCTION) {
      logIntoFile(stampWithTime(message), logFile);
    }
  }
};
