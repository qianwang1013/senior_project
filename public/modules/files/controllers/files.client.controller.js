'use strict';

// Files controller
angular.module('files').controller('FilesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Files',
	function($scope, $stateParams, $location, Authentication, Files) {
		$scope.authentication = Authentication;

		// Create new File
		$scope.create = function() {
			// Create new File object
			var file = new Files ({
				name: this.name
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
			$scope.files = Files.query();
		};

		// Find existing File
		$scope.findOne = function() {
			$scope.file = Files.get({ 
				fileId: $stateParams.fileId
			});
		};
	}
]);