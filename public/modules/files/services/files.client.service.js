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
])

.factory('FileType',function(){

    var fileType = '';

    return {
        getObj: function(){
        	return fileType;
        },
        setObj: function(data){
        	fileType = data;
        },

    };
})

.directive('pdf', ['$sce',
     function($sce){
        function link(scope, element, attrs){
            element.bind('change', function(){
                if(this.value === ''){
                    alert('Empty Files');
                }
                else{
                    console.log(this.value);
                    var ext = this.value.substring(this.value.lastIndexOf('.'), this.value.length);                
                    switch(ext){
                       case '.pdf':
                         break;
                       default:
                         alert('Invalid file extension. Accepted is pdf');
                         this.value='';
                    }
                }

                var pdfs = event.target.files;
                var pdf = pdfs[0];
                scope.pdf = pdf;
                var blob = new Blob([pdf], {type: 'application/pdf'});
                scope.$parent.tmpPath = $sce.trustAsResourceUrl((window.URL || window.webkitURL).createObjectURL( blob ));
                scope.$parent.pdf = pdf;
                scope.$apply();
            });
        }
        return{
            restrict: 'ACE', 
            scope: {
              file: '@'
            },  
            link    : link
        };   
    }
])

.directive('myCanvas',[ '$document', '$window',
  function($document, $window){
    function link(scope, element, attr){
      var canvas = element[0];
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = 'green';
      ctx.fillRect(0, 0, attr.height, attr.width);
      
      console.log();
    }
    return{
      restrict: 'A',
      scope: {
        file: '@'
      }, 
      link    : link
    };
}]);

