var env = process.env.NODE_ENV || "development",
	config = require('./config/config.json')[env];

module.exports = {
	'url': 'mongodb://' + config.mongo.host + ':' + config.mongo.port + '/' + config.mongo.db
}