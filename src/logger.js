const fs = require('fs');

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

module.exports = function(logFile) {
  return function(message) {
    logIntoFile(stampWithTime(message), logFile);
  }
};
