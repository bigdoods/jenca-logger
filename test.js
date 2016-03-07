var tape = require("tape")
var async = require("async")
var path = require("path")
var http = require("http")
var from2 = require("from2-string")
var hyperquest = require("hyperquest")
var hyperrequest = require("hyperrequest")
var concat = require("concat-stream")
var settings = require('./settings')
var Router = require('./router')
var pad = require('pad');


var args = require('minimist')(process.argv, {
  alias:{
    p:'port',
  },
  default:{
    port:process.env.PORT || 80,
    slack_url:process.env.SLACK_URL || settings.log_destinations.slack.integration_url,
    slack_username:process.env.SLACK_USERNAME || settings.log_destinations.slack.username,
  }
})

var sourceData = [
  {
    level:'critical',
    message:'Some testing log message'
  },
  {
    level:'debug',
    message:'Another testing log message'
  }
]

function getSourceStream(){
  return from2(JSON.stringify(sourceData))
}


tape('basic http request response', function (t) {

  var router = Router(args)
  var server = http.createServer(router.handler)

  async.series([
    function(next){
      server.listen(8060, next)
    },
    function(next){
      var req = hyperquest('http://127.0.0.1:8060/v1/logging', {
        method:'POST'
      })

      var sourceStream = getSourceStream()

      var destStream = concat(function(result){
        next()
      })

      sourceStream.pipe(req).pipe(destStream)

      req.on('response', function(res){
        t.equal(res.statusCode, 201, 'The status code == 201')
      })

      req.on('error', function(err){
        next(err.toString())
      })
    },
    function(next){
      server.close(next)
    }
  ], function(err){
    if(err){
      t.error(err)
      t.end()
      return
    }
    t.end()
  })

})