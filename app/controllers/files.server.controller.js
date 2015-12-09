'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	mongodb = require('mongodb'),
	Grid = require('gridfs-stream'),
    GridFS = new Grid(mongoose.connection.db, mongoose.mongo),
	fs = require('fs'),
	path = require('path'),
	errorHandler = require('./errors.server.controller'),
	File = mongoose.model('File'),
	_ = require('lodash');

/**
 * Create a File
 */
exports.create = function(req, res) {
	var file = new File(req.body);
	var tmp = new Buffer(req.body.fileBlob);
	file.fileBlob = tmp;
	file.user = req.user;

	file.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(file);
		}
	});
};

/**
 * Show the current File
 */
exports.read = function(req, res) {
	res.jsonp(req.file);
};

/**
 * Update a File
 */
exports.update = function(req, res) {
	var file = req.file ;

	file = _.extend(file , req.body);

	file.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(file);
		}
	});
};

/**
 * Delete an File
 */
exports.delete = function(req, res) {
	var file = req.file ;

	file.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(file);
		}
	});
};

/**
 * List of Files
 */
exports.list = function(req, res) { 
	File.find().sort('-created').populate('user', 'displayName').exec(function(err, files) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(files);
		}
	});
};

/**
 * File middleware
 */
exports.fileByID = function(req, res, next, id) { 
	File.findById(id).populate('user', 'displayName').exec(function(err, file) {
		if (err) return next(err);
		if (! file) return next(new Error('Failed to load File ' + id));
		req.file = file ;
		console.log(file);
		next();
	});
};

/**
 * File authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.file.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.passIn = function(req, res){
	console.log(req.body);
	res = new Buffer(req.body.fileBlob);

};

exports.createRTF = function(req, res){
	console.log('createRTF');
	var file = req.body;
	var file_path = path.join(__dirname, '../..', 'public', 'modules','files', 'download','file.rtf');
	var file_content = '';
	var file_keyword = '';
	file.keywords.split(',').forEach( function(data){
		file_keyword += '<Keyword> ' + data + ' <Keyword>' + '\n';		
	});
	if(file.fileType === 'Book'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<PubLo> ' + file.publisherLocation + ' <PubLo>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='Journal Paper'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<PubLo> ' + file.publisher + ' <PubLo>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Conference Paper Format #1'){
		file_content += '<Title> ' + file.title + ' <Title>' + '\n' +
						'<Author> ' + file.author + ' <Author>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Conference Paper Format #2'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Conf> ' + file.publisher + ' <Conf>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Trade Publication'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Trade Publication with no Author Attribution'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Newspaper Article with Byline'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Newspaper Article without Byline'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Doctoral Dissertation'){
		file_content += '<Title> ' + file.title + ' <Title>' + '\n' +
						'<Author> ' + file.author + ' <Author>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='M.S. Thesis'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Technical Manual with Byline'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='Technical Manual without Byline'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Web Reference with Known Author'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Web Reference with Unknown Author'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Unpublished Manuscript'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Personal Correspondence or Conversation'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else{
		file_content += 'Error Type';
	}
	
	file_content += file_keyword;

	fs.writeFile(file_path, file_content, function(err){
		if(err){
			res.status(403).send('Cannot write file');
			throw err;			
		}
		else{
			res.status(200);
			res.send();
		}
	});
};

exports.createASCII = function(req, res){
	console.log('createASCII');	
	var file = req.body;
	var file_path = path.join(__dirname, '../..', 'public', 'modules','files', 'download','file.txt');
	var file_content = '';
	var file_keyword = '';
	file.keywords.split(',').forEach( function(data){
		file_keyword += '<Keyword> ' + data + ' <Keyword>' + '\n';		
	});
	if(file.fileType === 'Book'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<PubLo> ' + file.publisherLocation + ' <PubLo>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='Journal Paper'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<PubLo> ' + file.publisher + ' <PubLo>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Conference Paper Format #1'){
		file_content += '<Title> ' + file.title + ' <Title>' + '\n' +
						'<Author> ' + file.author + ' <Author>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Conference Paper Format #2'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Conf> ' + file.publisher + ' <Conf>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Trade Publication'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Trade Publication with no Author Attribution'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Newspaper Article with Byline'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Newspaper Article without Byline'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Doctoral Dissertation'){
		file_content += '<Title> ' + file.title + ' <Title>' + '\n' +
						'<Author> ' + file.author + ' <Author>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='M.S. Thesis'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Technical Manual with Byline'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType ==='Technical Manual without Byline'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Web Reference with Known Author'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Web Reference with Unknown Author'){
		file_content += '<Author> ' + 'Anon' + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Unpublished Manuscript'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else if( file.fileType === 'Personal Correspondence or Conversation'){
		file_content += '<Author> ' + file.author + ' <Author>' + '\n' +
						'<Title> ' + file.title + ' <Title>' + '\n' +
						'<Pub> ' + file.publisher + ' <Pub>' + '\n' +
						'<Year> ' + file.year + ' <Year>' + '\n';
	}
	else{
		file_content += 'Error Type';
	}
	
	file_content += file_keyword;

	fs.writeFile(file_path, file_content, function(err){
		if(err){
			res.status(403).send('Cannot write file');
			throw err;			
		}
		else{
			res.status(200);
			res.send();
		}
	});

};

