module.exports = function(config){
  function create(entries, done){
  	entries.forEach(function(entry){
	  	console.log(''+ new Date() +': '+ entry.level + ': '+ entry.message)
	})

    done()
  }

  return {
  	create:create
  }
}