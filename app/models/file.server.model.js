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
	fileType: {
		type: String,
		default: '',
		required: 'File type needed'
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
	publisherLocation: {
		type: String, 
		default: ''
	},
	publisher:{
		type: String, 
		default: ''
	},
	year: {
		type: String, 
		default: ''
	},
	ifEdit:{
		type: Date
	},
	fileBlob:{
		type: Buffer
	}
});

mongoose.model('File', FileSchema);