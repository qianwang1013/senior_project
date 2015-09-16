'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var FileSchema = new Schema({
	fileName: {
		type: String,
		trim: true,
		required: 'Please fill keyword',
		default: ''
	},
	fileKeyword: {
		type: String, 
		trim: true,
		required: 'Enter some keywords',
		default: ''
	},
	fileAuthor: {
		type: String, 
		required: 'Enter some author',
		default: 'NA'
	},
	fileDate: {
		type: Date, 
	},
	fileExt: {
		type: String, 
	}
	fileNotes: {
		type: String,
	}

});

mongoose.model('File', FileSchema);