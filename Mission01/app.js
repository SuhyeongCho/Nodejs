var fs = require('fs');

var data = fs.readFile('./test.txt','utf8',function(err,data){
  if(err) throw err;
  var array = data.toString().split('\n');

  for(i in array){
    var array2 = array[i].toString().split(' ');
    var name = array2[0];
    console.log(name);
  }
});
