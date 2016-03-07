var path = require('path')
var http = require('http')
var settings = require('./settings')

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

var router = Router(args)

var server = http.createServer(router.handler)

server.listen(args.port, function(err){
  if(err){
    console.error(err.toString())
    return
  }
  console.log('server listening on port: ' + args.port)
})