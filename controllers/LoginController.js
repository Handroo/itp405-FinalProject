var User = require('../models/User');
var Color = require('../models/Color');
var Animal = require('../models/Animal');
module.exports = {
	autoLogin:function(username,password,request,response){

		User.validLogin(username,password,function(loginResults){

			if(loginResults){
				if(request.session.admin){
					Color.color.findAll().then(function(cresults){
						Animal.animal.findAll().then(function(aresults){
							request.session.admin = true;
							response.render('chat',{
								username:username,
								admin:request.session.admin,
								title:"Chat",
								color : loginResults.color,
								animal : loginResults.animal,
								colorlist : cresults,
								animallist:aresults
							});
						});
					});
				}else{
					response.render('chat',{
						username:username,
						admin:request.session.admin,
						title:"Chat",
						color : loginResults.color,
						animal : loginResults.animal,
						username: username
					});
				}
			}
		});
	},
	login: function(request, response) {

		User.validLogin(request.body.username,request.body.password,function(loginResults){
			if(loginResults){
				User.checkAdmin(User.user,request.body.username,request.body.password,function(isAdmin){
				
					request.session.username = request.body.username;
					request.session.password = request.body.password;
					if(isAdmin){
						Color.color.findAll().then(function(cresults){
							Animal.animal.findAll().then(function(aresults){
								request.session.admin = true;
								response.render('chat',{
									// results:allResults
									username:request.body.username,
									admin:request.session.admin,
									title:"Chat",
									color : loginResults.color,
									animal : loginResults.animal,
									colorlist : cresults,
									animallist:aresults
								});
							});
						});
						
					}else{
						request.session.admin = false;
						response.render('chat',{
							username:request.body.username,
							admin:request.session.admin,
							title:"Chat",
							color : loginResults.color,
							animal : loginResults.animal

						});
					}
					
				});
			}else{
				request.flash('loginError', 'Invalid Login!')
				response.redirect('/');
			}
		});
	},
	register: function(U,request, response) {
		request.body.username = request.body.username.replace(/ /g,'');
		request.body.password = request.body.password.replace(/ /g,'');
		if(request.body.username.length < 5){
			request.flash('registerError', 'Make sure your username is at least 5 characters!');
			response.redirect('/register');
			return;
		}

		if(request.body.password.length < 5 || request.body.password.length >20){
			request.flash('registerError', 'Make sure your password is at between 5 and 20 characters!');
			response.redirect('/register');
			return;
		}
		U.checkNewAccount(request.body.username,request.body.password,request.body.color,request.body.animal,function(accountData){
			if(accountData){
				request.session.admin = false;
				request.session.username = request.body.username;
				request.session.password = request.body.password;
				response.redirect('/');
			}else{
				request.flash('registerError', 'Invalid Account Info!');
				response.redirect('/register');
			}
		});
	},
	logout:function(request, response) {
		request.session.destroy();
		response.redirect('/');
	}
};