var HttpHashRouter = require('http-hash-router')

var Logging = require('./routes/logging')

module.exports = function(config){

  var router = HttpHashRouter();

  var loggingHandlers = Logging(config)

  // fish out user id from headers
  router.set('/v1/logging', loggingHandlers.index)


  function handler(req, res) {
    router(req, res, {}, onError);

    function onError(err) {
      if (err) {
        res.statusCode = err.statusCode || 500;
        res.end(err.message);
      }
    }
  }

  return {
    handler:handler
  }
}