var User = require('../models/User');
var MapAPI = require('../models/MapAPI');
var async = require('async')
module.exports = {
	getUSCCoordinates:function(callback){
		async.parallel([MapAPI.uscCoordinates], function(err, results) {
	    	callback(null,results[0])
		});
	},
	isAtUSC:function(location, callback){
		if(location.length != 0){
			callback(null,location[0],location[1]);
		}else{
			callback(null,false);
		}
	}
};