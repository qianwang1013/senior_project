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
                       // set isPdf flag
                         scope.$parent.pdf.flag = 1;
                         scope.$parent.img.flag = 0;
                         break;
                       case '.jpg':
                       // set isImg flag
                         scope.$parent.img.flag = 1;
                         scope.$parent.pdf.flag = 0;
                         break;
                       default:
                          /* jshint ignore: start */
                          toastr.error('Invalid file extension detected. Please enter Jpeg and Pdf file');
                          /* jshint ignore: end*/                    
                         scope.$parent.pdf.flag = 0;
                         scope.$parent.img.flag = 0;
                         this.value='';
                    }
                }
                var files = event.target.files;
                var file = files[0];
                if(scope.$parent.pdf.flag === 1){
                  scope.$parent.pdf.file = file;
                  scope.$parent.pdf.blob = new Blob([scope.$parent.pdf.file], {type: 'application/pdf'});
                  scope.$parent.pdf.tmpPath = $sce.trustAsResourceUrl((window.URL || window.webkitURL).createObjectURL( scope.$parent.pdf.blob ));
                }
                else if(scope.$parent.img.flag === 1){
                  scope.$parent.img.file = file;
                  scope.$parent.img.blob = new Blob([scope.$parent.img.file], {type: 'image/jpeg'});
                  scope.$parent.img.tmpPath = (window.URL || window.webkitURL).createObjectURL( scope.$parent.img.blob );
                  
                }
                else{
                  /* jshint ignore: start */
                  toastr.error('Something wrong');
                  /* jshint ignore: end*/
                  scope.$parent.pdf = {};
                  scope.$parent.img = {};
                }

                // Compile
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

