'use strict';

//Setting up route
angular.module('files').config(['$stateProvider', '$compileProvider',
	function($stateProvider, $compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
		var oldWhiteList = $compileProvider.imgSrcSanitizationWhitelist();
  		$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
		// Files state routing
		$stateProvider.
		state('listFiles', {
			url: '/files',
			templateUrl: 'modules/files/views/list-files.client.view.html'
		}).
		state('createFile', {
			url: '/files/create',
			templateUrl: 'modules/files/views/create-file.client.view.html'
		}).
		state('viewFile', {
			url: '/files/:fileId',
			templateUrl: 'modules/files/views/view-file.client.view.html'
		}).
		state('editFile', {
			url: '/files/:fileId/edit',
			templateUrl: 'modules/files/views/edit-file.client.view.html'
		}).
		state('filterFiles', {
			url: '/files/filter/:fileKeyword',
			templateUrl: 'modules/files/views/list-files.client.view.html'
		}).
		state('RTF', {
			url: '/download/file.rtf',
			templateUrl: 'modules/files/download/file.rtf'
		}).
		state('TXT', {
			url: '/download/file.txt',
			templateUrl: 'modules/files/download/file.txt'
		});
	}
]);