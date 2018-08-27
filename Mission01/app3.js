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
