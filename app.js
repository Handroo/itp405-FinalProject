
//Setting Up Express
var express = require('express');
var app = express();
// var expressValidator = require('express-validator');
//Getting Flash
var flash = require('connect-flash');
app.use(flash());
//Cookies
var cookieParser = require('cookie-parser')
app.use(cookieParser('cookie'));
var session = require('express-session')
// app.use(session({ secret: 'shhhh'}));
//hmmmm


var async = require('async')
//Starting HTTP server
var http = require('http');
var server = http.Server(app);
//Socket.io
var io = require('socket.io')(server);
//Setting up app
app.set('view engine', 'ejs');
app.set('trust proxy', 1) // trust first proxy
//Adding Controllers
var LoginController = require('./controllers/LoginController');
var AdminController = require('./controllers/AdminController');
var GPSController = require('./controllers/GPSController');
//Adding Models
var Color = require('./models/Color');
var Animal = require('./models/Animal');
var User = require('./models/User');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
// app.use(expressValidator());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// var sess;

//Unit Test
exports.testGet = function(test){
  var express = request(app);
  express.get('/').expect(function(response) {
    // response is the response from hitting '/' 
    test.equal(response.body, "ok");
    test.equal(response.statusCode, 200);
    test.equal(response.headers['content-type'], "text/html");
    test.done();
    express.close();
  });
}



io.on('connection', function(socket){
  //conect logic
  socket.on('disconnect', function(){
    //diconnect logic
  });
  socket.on('chat message', function(msg){
     io.emit('chat message', msg);
  });
});

app.get('/', function(request, response) {

	async.waterfall([GPSController.getUSCCoordinates,GPSController.isAtUSC], function(err, latitude,longitude) {
    	if(latitude & longitude){
    		if(request.session.username && request.session.password){
    			LoginController.autoLogin(request.session.username,request.session.password,request,response)
    		}else{
    			response.render('login',{
					errors : request.flash('loginError'),
					title:"ShoutOn",
					latitude:latitude,
					longitude:longitude

				});
    		}
    	}
	});
});

app.get('/register', function(request, response) {
	Color.color.findAll().then(function(cresults){
		Animal.animal.findAll().then(function(aresults){
			response.render('register',{
				errors : request.flash('registerError'),
				title:"Register",
				colors:cresults,
				animals:aresults
			});
		});
	});
});

app.post('/', LoginController.login);
app.post('/createAccount', LoginController.register.bind(null, User));
app.post('/adminCreateAccount', AdminController.createAccount);
app.post('/logout', LoginController.logout);





//Fires up the local server
var server = server.listen(3000,function(){
	var host = server.address().address;
  	var port = server.address().port;

  	console.log('Example app listening at http://%s:%s', host, port);
});