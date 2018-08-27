var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var static = require('serve-static');

var expressErrorHandeler = require('express-error-handler');

var cookieParser = require('cookie-parser');

var router = express.Router();
var app = express();

app.set('port',process.env.PORT||3000);

app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

app.use(static(path.join(__dirname,'public')));

app.use(cookieParser());
/*
app.use(function(req,res,next){
	console.log("First Middleware started");

	var paramId = req.body.id||req.query.id;
	var paramPassword = req.body.password||req.query.password;

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express Result</h1>');
	res.write('<div><p>Param id : '+paramId+'</p></div>');
	res.write('<div><p>Param password : '+paramPassword+'</p></div>');
	res.end();
});
*/

router.route('/process/login').post(function(req,res){
	console.log('/process/login Processed');

	var paramId = req.body.id||req.query.id;
	var paramPassword = req.body.password||req.query.password;

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express Result</h1>');
	res.write('<div><p>Param id : '+paramId+'</p></div>');
	res.write('<div><p>Param password : '+paramPassword+'</p></div>');
	res.write("<br><br><a href='/login2.html'>Return to Login Page</a>");
	res.end();
});

router.route('/process/users/:id').get(function(req,res){
	console.log('/process/users/:id Processed');

	var paramId = req.params.id;

	res.writeHead('200',{'Content-Type':'text/html;charset=utf8'});
	res.write('<h1>Express Result</h1>');
	res.write('<div><p>Param id : '+paramId+'</p></div>');
	res.end();
})

router.route('/process/showCookie').get(function(req,res){
  console.log('/process/showCookie');

  res.send(req.cookies);
});

router.route('/process/setUserCookie').get(function(req,res){
  console.log('/process/setUserCookie');

  res.cookie('user',{
    id:'mike',
    name:'GG',
    authorized:true
  });

  res.redirect('/process/showCookie');
});
/*
app.all('*',function(res,req){
	res.status(404).send('<h1>ERROR - CANNOT FIND THE PAGE</h1>');
})
*/
app.use('/',router);

var errorHandler = expressErrorHandeler({
	static:{
		'404': './public/404.html'
	}
});

app.use(expressErrorHandeler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000,function(){
	console.log('Express Server Starts port 3000');
});
