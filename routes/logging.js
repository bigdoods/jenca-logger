var path = require('path')
var concat = require('concat-stream')
var settings = require('../settings')
var fs = require('fs')

module.exports = function(config){
  return {
    index:{
      POST:function(req, res, opts, cb){
        res.setHeader('content-type', 'application/json')

        req.pipe(concat(function(body){
          body = JSON.parse(body.toString())

          // destination modules are only instantiated once
          var destinations = []
          Object.keys(settings.log_destinations).forEach(function(destination){
            var libpath = path.join(__dirname, '..', 'destinations', destination)
            if(!fs.existsSync(libpath + '.js')){
              throw new Error('logging destination: ' + destination + ' does not exist')
            }

            destinations[destination] = require(libpath)(config)
          })

          Object.keys(settings.log_destinations).forEach(function(destination){

              destinations[destination].create(body, function(err){
                if(err){
                  res.statusCode = 500
                  res.end(JSON.stringify({err:err}))

                  return
                }

                res.statusCode = 201
                res.end()
              })
          })
        }))

      }

    }
  }
}