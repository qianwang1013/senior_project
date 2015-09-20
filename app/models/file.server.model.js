'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * File Schema
 */
var FileSchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill File name',
		trim: true
	},
	notes: {
		type: String, 
		default: ''
	},
	firstName: {
		type: String,
		default: ''
	},
	lastName: {
		type: String,
		default: ''
	},
	keywords: {
		type: String, 
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('File', FileSchema);