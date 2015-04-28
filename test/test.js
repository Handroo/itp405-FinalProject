var assert = require("assert")
var GPSController = require('../controllers/GPSController');
var LoginController = require('../controllers/LoginController');
var AdminController = require('../controllers/AdminController');
var User = {
	checkNewAccount: function(username,password,color,animal,callback){
		if(username != null && password != null && color != null && animal != null){
			callback(true);
		}else{
			callback(false);
		}
	}
};
var request = {
	error : "",
	errorMsg:"",
	session:{
		destroy: function(){}
	},
	body:{
		username: "",
		password: ""
	},
	flash:function(error,msg){
		this.error = error;
		this.errorMsg = msg;
	}
};

var response = {
	JSON : "",
    viewName: "",
    data : {}, 
    render: function(view, viewData) {
        this.viewName = view;
        this.data = viewData;
    },
    redirect: function(view) {
        this.viewName = view;
    },
    send: function(returnJSON){
    	this.JSON = JSON.parse(returnJSON);
    }
};


describe('GPSController', function(){
  describe('#getUSCCoordinates()', function(){
    it('should return coordinates', function(done){

      GPSController.getUSCCoordinates(function(err,results){
        if (err) throw err;
        try {
    		assert.equal(err, null);
  			assert.notEqual(results[0], null);
		  	done();
		} catch (err){
		  return done(err);
		}
        
      });
    })
  })
});


describe('LoginController', function(){
  describe('#logout()', function(){
    it('should render chatroom', function(done){

      LoginController.logout(request,response);
      try {
    		assert.equal(response.viewName,'/');
		  	done();
		} catch (err){
		  return done(err);
		}
      

    })
  })
});

describe('LoginController', function(){
  describe('#register() - invalidinput', function(){
    it('should flash false', function(done){
    	request.body.username = "1234";
    	request.body.password = "12345"

      LoginController.register(User,request,response);
      try {
    		assert.equal(request.error,'registerError');
		  	done();
		} catch (err){
		  return done(err);
		}
      

    })
  })
});

describe('AdminController', function(){
  describe('#createAccount() - invalidinput', function(){
    it('should return false JSON', function(done){
    	request.body.username = "1234";
    	request.body.password = "12345"

      AdminController.createAccount(request,response);
      try {
    		assert.equal(response.JSON,'Make sure your username is at least 5 characters!');
		  	done();
		} catch (err){
		  return done(err);
		}
      

    })
  })
});

describe('LoginController', function(){
  describe('#register() - successfulinput()', function(){
    it('should redirect to char page', function(done){
    	request.body.username = "123456";
    	request.body.password = "123456"
    	request.body.color = "1"
    	request.body.animal = "3"

      LoginController.register(User,request,response);
      try {
    		assert.equal(response.viewName,'/');
		  	done();
		} catch (err){
		  return done(err);
		}
      

    })
  })
});

