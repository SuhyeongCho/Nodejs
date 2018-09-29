var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var fs = require('fs');
var db = require('mysql');

//var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port',process.env.PORT||3000);

var server = http.createServer(app).listen(app.get('port'),function(){
                console.log('서버가 시작되었습니다. 포트 : '+app.get('port'));
                });

var connection = db.createConnection({
host: "localhost",
user: "root",
password: "*71597CDF17707C3ACCA3697B44F7D225A526EB10",
database: "opentutorials",
port:3000
});

    //category로 음식점 선별
    app.get('/list/:pageId',function(request,response){
      var commend = `SELECT name,cur_t,tor_t FROM restaurant WHERE category=?`;
      var values = [request.params.pageId];
      connection.query(commend,values,function(err,results){
        response.json(results);
        console.log('success /list/pageID');
        });
    });

      //음식점 이름 누르면 정보 뜨게하기
      app.get('/info/:name',function(request,response){
        var commend = `SELECT name,open_t,close_t,align,tel,address FROM restaurant WHERE name=?`;
        var values = [request.params.name];
        connection.query(commend,values,function(err,results){
          response.json(results);
          console.log('success /info/name');
        });
      });

      //예약 정보 전송 받기
      app.post('/info/:name/reservation',function(request,response){
        var post = request.body;
        var commend = `INSERT INTO reservation (restaurant_name,book_name,book_t,book_tel,book_count) VALUES(?,?,?,?,?)`;
        var values = [post.restaurantName,post.name,post.time,post.phone,post.people];
          connection.query(commend,values,function(err,result){
            response.send('reservation success');
            console.log('succes /info/name/reservation');
          });
      });
//!!!!!!!!!!!!!!!!!!예약 확인 페이지, 예약 수락 페이지, <-OX ,확정된 예약목록 ? or 수락,거절 버튼을 없애버리기?

        //가게 이름에 맞게 예약 보내주기
        app.get('/:restaurant_name',function(request,response){
          var commend = `SELECT * FROM reservation WHERE restaurant_name =?`;
          var values =[request.params.restaurant_name];
          connection.query(commend,values,function(err,results){
            response.json(results);
            console.log('success /restaurant_name');
          });
        });
        //예약 버튼에 맞게 수락, 거절 설정
        app.post('/:restaurant_name/:book_name/:bool',function(request,response){
          if(req.params.bool ==0){
            var acception = 'X';
          }else {
            var acception = 'O';
          }
          var commend = `UPDATE reservation SET accept='${acception}' WHERE book_name =?`;
          var values = [req.params.book_name];
          connection.query(commend,values,function(err,results){
            console.log('success /restaurant_name/book_name/bool');
          });
        });

        //아이디 중복검사
        app.post('/overlap',function(request,response){
          var post = request.body;
          var commend = `SELECT * FROM user WHERE ?`;
          var values = [post.user_id];
          connection.query(commend,values,function(err,result){
            if(result[0]){
              response.send('ID_success');
            } else{
              response.send('ID_overlap');
            }
            console.log('success /overlap');
          });
        });

        //login 페이지
        app.post('/login',function(request,response){
          var post =request.body;
          var commend = `SELECT * FROM user WHERE user_id='${post.ID}' AND password ='${post.PW}'`;
          //console.log(commend);
          // var values = [post.user_id,post.password];
          //console.dir(post);
          console.log(commend);
          connection.query(commend,function(err,result){
            console.log(result[0]);
              if(result[0]){
                response.send('success');
                console.log('success');
              }
              else{
                response.send('fail');
                console.log('fail');
              }
            });
        });

        //가입 user 저장
        app.post('/insert/user',function(request,response){
          var post = request.body;
          var commend = `INSERT INTO user (user_name,user_id,password,tel) VALUES(?,?,?,?)`;
          var values = [post.user_name,post.user_id,post.password,post.tel];
          console.dir(post);
          console.log(commend);
          connection.query(commend,values,function(err,result){
            response.send('success');
            console.log('success');
          });
        });

        //레스토랑 정보 INSERT
        app.post('/insert/restaurant',function(request,response){
          var post = request.body;
          var commend = `INSERT INTO restaurant (name,cur_t,tot_t,category,open_t,close_t,align,tel,address) VALUES(?,?,?,?,?,?,?,?,?)`;
          var values = [post.name,post.cur_t,post.tot_t,post.category,post.open_t,post.close_t,post.align,post.tel,post.address];
          connection.query(commend,values,function(err,result){
            console.log('restaurant insert success');
          });
        });
