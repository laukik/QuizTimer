//var redis = require('redis').createClient();
var express = require('express'),http = require('http');
var app = express();
var server = http.createServer(app).listen(5000);
var io = require('socket.io').listen(server);
var t,timer;
var user = [];
var timestamp = [];


/*    middlewares          */

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(__dirname + '/'));

/*            here server lies        */


app.get('/',function(req,res){
	console.log("/");
	//t = new Date();
	res.render('index.ejs');
});




/*			  socket.io stuff		 */


io.sockets.on('connection',function(socket){
	user.push(socket);
	timestamp[user.indexOf(socket)] = new Date();
	socket.emit('displaytime',"0:0:0");
	socket.on('gettime',function(){
		t = new Date();
		t = t.getTime() - timestamp[user.indexOf(socket)].getTime();
		timer = Math.floor(t/60000);
		if(timer == 2) socket.emit('alert');
		else socket.emit('displaytime',Math.floor(t/3600000)%60+' : '+timer%60+' : '+Math.floor(t/1000)%60);
	});
});








/**  debug materials:

	console.log('ssssssssssssssssssssssssssssssssssssssss');
	alert('sssss');
   setTimeout(5000);
   socket.on('connect',function(){});
                     
		console.log(t);
		console.log(t/1000);
		console.log(t/60000);
		console.log(t/3600000);

**/