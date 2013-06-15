var _ = require('lodash');
var shell = require('shelljs');

var config = require('./servers.config.json');

module.exports = function (grunt) {

	grunt.initConfig({});

	grunt.registerTask('start', function (serverId) {
		var server = config[serverId];

		if (!server) {
			return grunt.log.fail('The specified server does not exist in servers.config.json');
		}

		var command = [
			'screen -dmS',
			serverId,
			'java -Xincgc',
			'-Xms' + server.memory.initial,
			'-Xmx' + server.memory.max,
			'-jar',
			server.jarfileLocation
		].join(' ');

		console.log('Running server start command: ' + command);

		//shell.exec(command);
		grunt.log.ok('Server was started successfully');

	});


	grunt.registerTask('start-all', function () {

		_.each( Object.keys(config), function (key) {
			grunt.task.run('start:' + key);
		});

	});

	grunt.registerTask('kill', function () {

	});


};