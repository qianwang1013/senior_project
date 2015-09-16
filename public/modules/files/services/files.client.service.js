'use strict';

//Files service used to communicate Files REST endpoints
angular.module('files').factory('Files', ['$resource',
	function($resource) {
		return $resource('files/:fileId', { fileId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);