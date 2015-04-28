var sequelize = require('./../config/sequelize');
var Sequelize = require('sequelize');


var Color = sequelize.define('color',{
		color:{
			field:'color_name',
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
	color:Color,
	findColorName : function(color_id,callback){
		Color.findAll({
			where:{
				id:color_id
			},
		}).then(function(results){
			if(results.length > 0){
				callback(null,results[0].color);
			}else{
				callback(null,null);
			}
		});
	}
}



