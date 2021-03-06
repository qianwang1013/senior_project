'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var files = require('../../app/controllers/files.server.controller');

	// Files Routes
	app.route('/files')
		.get(files.list)
		.post(users.requiresLogin, files.create);
		
	app.route('/files/createRTF')
		.post(files.createRTF);

	app.route('/files/createASCII')
		.post(files.createASCII);

	app.route('/files/:fileId')
		.get(files.read)
		.put(users.requiresLogin, files.hasAuthorization, files.update)
		.delete(users.requiresLogin, files.hasAuthorization, files.delete);


	app.route('/passIn').post(files.passIn);
	// Finish by binding the File middleware
	app.param('fileId', files.fileByID);
};
