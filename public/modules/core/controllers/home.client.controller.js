'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$location', 'Keywords',
	function($scope, Authentication, $http, $location, Keywords) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

		$scope.queryString = ''; //input query string
		$scope.autoString = [];  //output autoFit string array

		$scope.getKeywords = function(){
			var keywords = Keywords.query();

			autoFit(keywords);
		};

		$scope.$watch('queryString', function(){
			console.log('Damn');
			if($scope.queryString === ''){
				$scope.autoString = [];
			}
			else{
				areYouInArray($scope.keywordStrings, $scope.queryString);
			}
			console.log($scope.autoString);
		});


		$scope.addKeywords = function(){
			var keyword = new Keywords({
				keyword: $scope.keyword,
			});

			keyword.$save(function(response) {
				$location.path('/');

				// Clear form fields
				$scope.keyword = '';
				$scope.getKeywords();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		var autoFit = function(data){
			var keywordStrings = [];
			data.$promise.then(function(data){
				angular.forEach(data, function(obj){
					var keyword = obj.keyword;
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
			$scope.queryString = data;
		};
	}
]);


