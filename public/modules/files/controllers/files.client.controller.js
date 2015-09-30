'use strict';

// Files controller
angular.module('files').controller('FilesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Files',
	function($scope, $stateParams, $location, Authentication, Files) {
		$scope.authentication = Authentication;
		$scope.keywords = [];
		// Create new File
		$scope.create = function() {
			var keywords = $scope.keywords.toString();
			console.log(keywords);
			// Create new File object
			var file = new Files ({
				title: this.title,
				notes: this.notes,
				author: this.author,
				abstract: this.abstract,
				description: this.description,
				keywords: keywords,
				publisher: this.publisher,
				year: this.year
			});

			// Redirect after save
			file.$save(function(response) {
				$location.path('files/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing File
		$scope.remove = function(file) {
			if ( file ) { 
				file.$remove();

				for (var i in $scope.files) {
					if ($scope.files [i] === file) {
						$scope.files.splice(i, 1);
					}
				}
			} else {
				$scope.file.$remove(function() {
					$location.path('files');
				});
			}
		};

		// Update existing File
		$scope.update = function() {
			var file = $scope.file;

			file.$update(function() {
				$location.path('files/' + file._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Files
		$scope.find = function() {
			var files = Files.query();

			// Must make sure the last input is the keywords
			var keyword = $location.url().split('/')[($location.url().split('/')).length - 1];
			console.log(keyword);
			if(keyword === 'files'){
				$scope.files = files;

			}
			else{

				filter(files, keyword);				
			}

		};	

		var filter = function(files, filteKeyword){
			$scope.files = [];
			files.$promise.then(function(data){
				angular.forEach(data, function(obj){
					var keyword = obj.keywords;
					if(keyword.indexOf(filteKeyword) > -1 && keyword !== '' && filteKeyword !== ''){
						$scope.files.push(obj);			
					}
				}); 
			});			
		};

		// Find existing File
		$scope.findOne = function() {
			$scope.file = Files.get({ 
				fileId: $stateParams.fileId
			});
		};



		$scope.ifReady = false;
		$scope.toggleState = function(){
			$scope.ifReady = !$scope.ifReady;
		};

		$scope.addKeyword = function(){
			if(this.keyword){
				$scope.keywords.push(this.keyword);
				$scope.keyword = '';
			}
			$scope.toggleState();				

		};

		$scope.getCitation = function(file){
			var Citation = file.author + ' , ' + file.title + ' , ' + file.publisher + '(' + file.year + ')' ;
			
			return Citation; 
		};
	}
]);