var rest = require('rest');
var NodeCache = require( "node-cache" );
var myCache = new NodeCache();



module.exports = {
	uscCoordinates: function(callback) {
		myCache.get( "myKey", function( err, value ){
		  if( !err ){
		    if(value == undefined){
		     	var coordinates = [];
				rest('http://dev.virtualearth.net/REST/v1/Locations/USC?key=AuOF_mnSGVmk46m2TKEc1Hh8i5j0dItHxv-lkgXB6hWKMQveK4F6H5qCCGIIxbKF').then(function(response) {
				    var json =  JSON.parse(response.entity);
				    var list = json.resourceSets[0].resources;
				    for(var i =0; i<list.length;i++){
				    	if(list[i].name == "University of Southern California, CA"){
				    		var lat = list[i].point.coordinates[0];
				    		var lon = list[i].point.coordinates[1];
				    		coordinates = [lat,lon]
				    	}
				    }
				    myCache.set( "myKey", coordinates, function( err, success ){
					  if( !err && success ){
					  	//succes logic
					  }
					});

				    callback(null,coordinates);
				});
		    }else{
		    	//cache is stored
		      	callback(null,value);
		    }
		  }
		});
	}
}



