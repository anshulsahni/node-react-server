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
  fs.appendFile(logFile, `${message}\n`, function(error) {
    if (error) {
      console.log(stampWithTime('ERROR: Writing to log file operation failed'));
    }
  })
};

module.exports = function(logLevel, logFile) {
  return function(message) {
    if (logLevel === 'file') {
      logIntoFile(stampWithTime(message), logFile);
    } else if (logLevel === 'screen') {
      console.log(stampWithTime(message));
    } else {
      return;
    }
  }
};
