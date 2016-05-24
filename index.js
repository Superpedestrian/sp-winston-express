'use strict';

var getenv = require('getenv');
var winston = require('winston');

// Just take over stream, don't add format
// streaming to morgan or expressWinston error logs
var unformattedLog = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      formatter: function(options) {
        return options.message
      },
    })
  ],
  exitOnError: false
});
var log = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: function() {
        return new Date().toISOString();
      },
      formatter: function(options) {
        // Return string will be passed to logger.
        return '[' + options.level.toUpperCase() + '] ' +
          options.timestamp() + ' ' +
          (options.message !== undefined ? options.message : '') +
          (options.meta && Object.keys(options.meta).length ? ' | ' +
           JSON.stringify(options.meta) : '' ) +
          (
            options.meta && options.meta.stack !== undefined ?
              '\nStack:\n' + options.meta.stack.join('\n') :
              ''
          ) ;
      },
      level: getenv('LOG_LEVEL', 'debug'),
      handleExceptions: true,
      humanReadableUnhandledException: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

var errorLogger = function(err, req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  log.error(req.method + ' ' + req.url + ' ' + ip + ' - ' +
            err.message,
            winston.exception.getAllInfo(err)
           );
  next(err);
}

module.exports = log;
module.exports.errorLogger = errorLogger;
module.exports.stream = {
  write: function(message, encoding){
    unformattedLog.info(message);
  }
};
