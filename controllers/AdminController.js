var User = require('../models/User');
module.exports = {
	createAccount: function(request, response) {
		if(request.body.username.length < 5){
			response.send(JSON.stringify('Make sure your username is at least 5 characters!')) ;
			return;
		}

		if(request.body.password.length < 4 || request.body.password.length >20){
			response.send(JSON.stringify('Make sure your password is at between 5 and 20 characters!')) ;
			return;
		}
		User.checkNewAccount(request.body.username,request.body.password,request.body.color,request.body.animal,function(validAccount){
			if(validAccount){
    			response.send(JSON.stringify("success"))
			}else{
    			response.send(JSON.stringify("failure"))
			}
		});
	}
};