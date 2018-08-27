var http = require('http');
var express = require('express');
var path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var app = express();

var router = express.Router();

var socketio = require('socket.io');

var cors = require('cors');

app.use(cors());

app.set('port',process.env.PORT||3000);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use('/public',static(path.join(__dirname,'public')));


var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('서버가 시작되었습니다. 포트 : '+app.get('port'));

});

var io = socketio.listen(server);
console.log('socket.io 요청을 받아줄일 준비가 되었습니다.');

var login_ids = {};

io.sockets.on('connection',function(socket){
  console.log('connection info : '+socket.request.connection._peername);

  socket.remoteAddress = socket.request.connection._peername.address;
  socket.remotePort = socket.request.connection._peername.port;

  socket.on('message',function(message){
    console.log('message 이벤트를 받았습니다.');
    console.dir(message);

    var str = message.str.toString();
    if(str){
      console.log('받았져요');
      var arr = str.split(' ');
      io.sockets.emit('message',arr);
    }
    else{
      console.log('못받았져요');
    }

  });

});
router.route('/text').post(function(req,res){
  var text = req.body.text;
  console.log("text : "+text);
  var sendText = {returnText : "ssuBs "+text}
  console.log("send : "+sendText.returnText);
  res.json(sendText);
});
app.use('/',router);
