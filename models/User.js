var sequelize = require('./../config/sequelize');
var Sequelize = require('sequelize');
var Color = require('./Color');
var Animal = require('./Animal');
var async = require('async')

var User = sequelize.define('user',{
		username:{
			field:'username',
			type: Sequelize.STRING
		},
		password:{
			field:'password',
			type: Sequelize.STRING
		},
		color:{
			field:'color_id',
			type: Sequelize.INTEGER
		},
		animal:{
			field:'animal_id',
			type: Sequelize.INTEGER
		},
		admin:{
			field:'admin',
			type: Sequelize.INTEGER
		}
	}, {
	  timestamps: false,
	}
);

module.exports = {
	user: User,
	validLogin: function(username,password,callback) {
		User.findAll({
			where:{
				username:username,
				password:password
			},
		}).then(function(results){
			if(results[0]){
				var colorid = results[0].dataValues.color;
				var animalid = results[0].dataValues.animal;
				async.parallel({ color: Color.findColorName.bind(null, colorid),
								 animal: Animal.findAnimalName.bind(null, animalid)}, function(err, result) {
			    	if(result.color && result.animal){
						callback(result);
					}else{
						callback(null);
					}
				});
			}else{
				callback(null);
			}
		});
		// callback(false);
	},
	checkAdmin: function(U,username,password,callback){
		U.findAll({
			where:{
				username:username,
				password:password
			},
			// order:'playCount DESC'
		}).then(function(results){
			if(results[0].admin == 1){
				callback(true);
			}else{
				callback(false);
			}
		});
		// callback(false);
	},
	checkNewAccount: function(username,password,color,animal,callback){
		User.findAll({
			where:{
				username:username
			},
		}).then(function(results){
			if(results[0]){
				//bad results
				callback(false);
			}else{
				//good resutls
				User.upsert({
					username:username,
					password:password,
					color:color,
					animal:animal,
					admin:0
				}).then(function(results){
					async.parallel({ color: Color.findColorName.bind(null, color),
							 		animal: Animal.findAnimalName.bind(null, animal)}, function(err, result) {
				    	if(result.color && result.animal){
							callback(result);
						}else{
							callback(null);
						}
					});
				});
			}
		});
	}
}



