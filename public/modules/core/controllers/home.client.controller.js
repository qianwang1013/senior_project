'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$location', 'Files',
	function($scope, Authentication, $http, $location, Files) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.isClosed = true;
		$scope.queryString = ''; //input query string
		$scope.autoString = [];  //output autoFit string array

		$scope.getKeywords = function(){
			var files = Files.query();

			autoFit(files);
		};

		$scope.$watch('queryString', function(){
			if($scope.queryString === ''){
				$scope.autoString = [];
			}
			else{
				$scope.isClosed = false;
				areYouInArray($scope.keywordStrings, $scope.queryString);
			}
		});


		var autoFit = function(data){
			var keywordStrings = [];
			data.$promise.then(function(data){
				console.log(data);
				angular.forEach(data, function(obj){
					var keyword = obj.keywords;
					if(keywordStrings.indexOf(keyword) === -1 && keyword !== ''){
						keywordStrings.push(keyword);
					}
				}); 
			});

			$scope.keywordStrings = keywordStrings;
		
		};

		var areYouInArray = function( array, string){
			$scope.autoString = [];
			angular.forEach(array, function(value){
				if(value.indexOf(string) > -1){
					$scope.autoString.push(value);
				}
			});
		};

		$scope.finishMyString = function(data){
			if(data === $scope.queryString){
				$scope.isClosed = true;
			}
			else{
				$scope.queryString = data;
			}
		};

		$scope.searchLocate = function(){

		};
		
	}
]);


