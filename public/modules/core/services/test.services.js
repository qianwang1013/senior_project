'use strict';

angular.module('core').factory('Keywords', ['$resource',
	function($resource) {

		return $resource('/testObj', { 
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
])

.directive('search', function(){

	return{
		restrict: 'ACE',
		template: 'dick',
		link: function(scope, element, attrs){

		}
	};
});