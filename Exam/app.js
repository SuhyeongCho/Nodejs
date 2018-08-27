var mecab = require('mecab-ffi');
var paragraph = "숭실대에서 화장실 찾아줘";

//mecab.parse(paragraph,function(err,result){
//  console.log(result);
//});

//var result = mecab.parseSync(paragraph);
//console.log(result);


mecab.extractNounMap(paragraph,function(err,result){
  //console.log(result);
  var str="";
  for(i in result){
    str = str+i+' ';
  }
  console.log(str);
  var arr = str.trim().split(' ');
  console.log(arr);
});
