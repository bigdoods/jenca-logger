var Slack = require('node-slack');

module.exports = function(config){
  function create(entries, done){
    var slacksink = new Slack(config.integration_url, {});
    var message = entries.map(function(entry){
        return ''+ new Date() +': '+ entry.level + ': '+ entry.message
    })

    if(message.length >0)
      slacksink.send({
        text: message.join("\n"),
        username: config.slacksink
      });
    done()
  }

  return {
    create:create
  }
}