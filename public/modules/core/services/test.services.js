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
]);