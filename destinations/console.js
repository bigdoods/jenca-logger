module.exports = function(config){
  function create(entries, done){
  	entries.forEach(function(entry){
	  	console.log(entry.level + ': '+ entry.message)
	})

    done()
  }

  return {
  	create:create
  }
}