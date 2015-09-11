'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', '$http', '$location',
	function($scope, Authentication, $http, $location) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.keyword = '';
		$scope.keywords = [];
		$scope.key = '';
		$scope.queryString = '';
		$scope.autoString = [];
		$scope.getKeywords = function(){
			$http.get('/testObj').success(function(res){
				$scope.keywords = res;
				autoFit(res);
			});
		};

		$scope.$watch('queryString', function(){
			console.log('Damn');
			areYouInArray($scope.keywordStrings, $scope.queryString);
			console.log($scope.autoString);
		})
		$scope.addKeywords = function(){
			var keyword = {
				keyword: $scope.keyword,
			};

			$http.post('/testObj', keyword).success(function(res){
				console.log(res);
				$scope.keyword = '';
			});			
		};

		var autoFit = function(data){
			var keywordStrings = [];
			console.log(data);
			angular.forEach(data, function(value){
				var keyword = value['keyword'];
				if(keywordStrings.indexOf(keyword) === -1 && keyword !== ''){
					keywordStrings.push(keyword);
				}
			}); 
			$scope.keywordStrings = keywordStrings;
			console.log($scope.keywordStrings);
		
		};

		var areYouInArray = function( array, string){
			$scope.autoString = [];
			angular.forEach(array, function(value){
				if(value.indexOf(string) > -1){
					$scope.autoString.push(value)
				}
			});
		}

	}
]);