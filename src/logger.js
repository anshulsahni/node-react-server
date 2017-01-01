const constants = require('./constants.js');

const pad = function(val) {
  return (String(val).length == 1 ? '0' : '') + val;
}

const timestamp = function() {
  const date = new Date();
  return date.getFullYear() + '-' + pad((date.getMonth() + 1)) + '-' + pad(date.getDate()) + ' ' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
}

module.exports = function(environment) {
  return function(message) {
    if (environment === constants.DEVELOPMENT) {
      console.log(timestamp() + ' - ' + message);
    }
  }
};
