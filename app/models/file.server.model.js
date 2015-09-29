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
	author: {
		type: String,
		default: ''
	},
	keywords: {
		type: String, 
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	abstract: {
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
	},
	publisher:{
		type: String, 
		default: ''
	},
	year: {
		type: String, 
		default: ''
	}
});

mongoose.model('File', FileSchema);