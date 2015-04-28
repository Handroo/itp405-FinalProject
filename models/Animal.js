var sequelize = require('./../config/sequelize');
var Sequelize = require('sequelize');


var Animal = sequelize.define('animal',{
		animal:{
			field:'animal_name',
			type: Sequelize.STRING
		},
		id:{
			field:'id',
			type: Sequelize.INTEGER
		}
	}, {
	  timestamps: false,
	}
);

module.exports = {
	animal: Animal,
	findAnimalName : function(animal_id,callback){
		Animal.findAll({
			where:{
				id:animal_id
			},
		}).then(function(results){
			if(results.length > 0){
				callback(null,results[0].animal);
			}else{
				callback(null,null);
			}
		});
	}
}



