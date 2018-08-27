var http = require('http');
var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var router = express.Router();

var static = require('serve-static');

var path = require('path');

var fs = require('fs');
var ejs = require('ejs');

app.set('port',process.env.PORT||3000);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));

app.use('/public',static(path.join(__dirname,'public')));


var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('서버가 시작되었습니다. 포트 : '+app.get('port'));
});

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'suhyeong',
  password : 'Whtngud2074!',
  database : 'project'
});

// connection.query('SELECT * FROM modify', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
//  });

router.route('/insert').post(function(req,res){
  connection.connect(function(){
    var sql = 'INSERT INTO modify (sentence) VALUES (?)';
    var txt = req.body.text;
    var param = [txt];
    connection.query(sql,param,function(err,results,fields){
      if(err) throw err;
    });
  });
});

app.get('/',function(req,res){
  fs.readFile('modify.html','utf8',function(err,data){
    if(err) throw err;
    var sql = 'SELECT * FROM modify';
    connection.query(sql,function(err,results,fields){
      if(err) throw err;
      var obj = {prodList:results};
      var ejsRender = ejs.render(data,obj);
      res.send(ejsRender);
    });
  });
});

// router.route('/modify').post(function(req,res){
//   connection.connect(function(){
//     var sql = 'SELECT * FROM modify';
//     connection.query(sql,function(err,results,fields){
//       if(err) throw err;
//       res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
//       res.write(`<style media="screen">
//         table,tr,th,td{
//           border: 1px solid
//         }
//       </style>`);
//       res.write(`<form class="" action="/public/modify.html" method="post">
//         <input type="submit" name="" value="데이터베이스 불러오기"></form>`);
//       res.write(`<table><tr>
//         <th>id</th>
//         <th>문장</th>
//         <th>수정 전</th>
//         <th>수정 후</th>
//       </tr>`);
//       for(var i=0;i<results.length;i++){
//         res.write(`<form method="POST" action="/modifying"><tr>
//           <td><input type="text" name="id" value="${results[i].id}"></td>
//           <td><input type="text" name="sentence" value="${results[i].sentence}"></td>
//           <td><input type="text" name="before" value="${results[i].before_modify}"></td>
//           <td><input type="text" name="after" value="${results[i].after_modify}"></td>
//           <td><input type="submit" value="바꾸기"></td>
//           </tr></form>`);
//       }
//       res.write('</table>');
//       res.end();
//     });
//   });
// });

router.route('/modifying').post(function(req,res){
  connection.connect(function(){
    var id = req.body.id;
    var before = req.body.before;
    var after = req.body.after;
    var sql = `UPDATE modify SET before_modify='${before}',after_modify='${after}' WHERE id=${id}`;
    console.log(sql);
    connection.query(sql,function(err,results,fields){
      if(err) throw err;
    });
  });
  res.redirect('http://localhost:3000');
});

app.use('/',router);
