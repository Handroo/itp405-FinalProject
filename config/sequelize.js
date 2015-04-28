var Sequelize = require('sequelize');

var sequelize = new Sequelize('andrew','andrew','han2015',{
		dialect: 'mysql',
		host:'itp460.usc.edu'
	});

module.exports = sequelize;