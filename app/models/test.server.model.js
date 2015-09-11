'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Test OBJ Schema
 */

var TestSchema = new Schema({
	keyword: {
		type: String,
		trim: true,
		required: 'Please fill keyword',
		default: ''
	},
});

mongoose.model('Test', TestSchema);