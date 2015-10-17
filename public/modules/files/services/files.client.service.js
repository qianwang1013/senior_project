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
            console.log(element);
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
]);

/*.directive('embedSrc', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var current = element;
      scope.$watch(attrs.embedSrc, function () {
        var clone = element
                      .clone()
                      .attr('data', attrs.embedSrc);
        current.replaceWith(clone); 
        console.log(attrs.embedSrc);
        current = clone;
      });
    }
  };
});*/
