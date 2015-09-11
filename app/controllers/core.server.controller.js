'use strict';

var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	TestObj = mongoose.model('Test'),
	_ = require('lodash');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

exports.list = function(req, res){
	TestObj.find().sort('-created').exec(function(err, data){
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log(data);
			res.jsonp(data);
		}
	});
};

exports.save = function(req, res){
	var testObj = new TestObj(req.body);
	testObj.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(testObj);
		}
	});	
};
