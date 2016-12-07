var moment = require('moment');

module.exports = function(environment) {
  return function(message) {
    if (environment.toLowerCase() === 'development') {
      console.log(moment().format('YYYY-MM-DD HH:mm:ss - ') + message);
    }
  }
};
