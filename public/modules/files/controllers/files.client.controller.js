'use strict';

// Files controller
angular.module('files').controller('FilesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Files', '$modal', 'FileType', '$http',
	function($scope, $stateParams, $location, Authentication, Files, $modal, FileType, $http ) {
		$scope.authentication = Authentication;
		$scope.keywords = [];
		$scope.pdf = {};
		$scope.img = {};
		// Create new File
		$scope.create = function() {
			var keywords = $scope.keywords.toString();
			var fileBlob;
			if($scope.pdf.flag === 1 && $scope.img.flag === 0){
				fileBlob = $scope.pdf.blob;
				$http.post('/passIn', fileBlob).success(function(data, err){
					console.log(data);
				});
			}
			else if($scope.img.flag === 1 && $scope.pdf.flag === 0){
				fileBlob = $scope.img.blob;
			}
			else{
                /* jshint ignore: start */
                toastr.error('Your file cannot be identified');
                /* jshint ignore: end*/
                fileBlob = {};
			}
			// Create new File object
			var file = new Files ({
				fileBlob: fileBlob,
				title: this.title,
				notes: this.notes,
				fileType: this.fileType,
				author: $scope.author,
				abstract: this.abstract,
				description: this.description,
				keywords: keywords,
				publisher: $scope.publisher,
				publisherLocation: $scope.publisherLocation,
				year: $scope.year
			});
			console.log(file);

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
			$scope.file.ifEdit = new Date();
			var file = $scope.file;

			file.$update(function() {
				$location.path('files/' + file._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Files
		$scope.find = function() {
			var files = Files.query();

			// Must make sure the last input is the keywords
			var keyword = $location.url().split('/')[($location.url().split('/')).length - 1];
			if(keyword === 'files'){
				$scope.files = files;

			}
			else{
				filter(files, keyword);				
			}

		};	

		var filter = function(files, filteKeyword){
			$scope.files = [];
			files.$promise.then(function(data){
				angular.forEach(data, function(obj){
					var keyword = obj.keywords;
					if(keyword.indexOf(filteKeyword) > -1 && keyword !== '' && filteKeyword !== ''){
						$scope.files.push(obj);			
					}
				}); 
			});			
		};

		// Find existing File
		$scope.findOne = function() {
			$scope.file = Files.get({ 
				fileId: $stateParams.fileId
			});

			$scope.file.$promise.then(function(data){
				$scope.keywords = data.keywords.split(',');
				console.log($scope.keywords);
			});

		};

		$scope.newlyEdit = function(editTime){

			var result = ((Date.now() - Date.parse(editTime)) < 60000) && ((Date.now() - Date.parse(editTime)) >= 0);
			return result;
		};

		$scope.ifReady = false;
		$scope.toggleState = function(){
			$scope.ifReady = !$scope.ifReady;
		};

		$scope.addKeyword = function(){
			if(this.keyword){
				$scope.keywords.push(this.keyword);
				$scope.keyword = '';
			}
			$scope.toggleState();				

		};

		$scope.getCitation = function(file){
			var Citation = file.author + ' , ' + file.title + ' , ' + file.publisher + '(' + file.year + ')' ;
			
			return Citation; 
		};


	  $scope.animationsEnabled = true;
	  $scope.modalInstance = {};
	  $scope.open = function (size) {

	    $scope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'modules/files/views/modal.create.view.html',
	      controller: 'ModalInstanceCtrl',
	      size: size,
	    });

	  };
	  $scope.setFileType = function(){
	  	var tmp = $scope.fileType;
	  	if($scope.fileType === ''){
	  		alert('Please select a type');
	  	}
	  	else{
			$location.path('files/create');
			FileType.setObj(tmp);

	  	}	  	
	  };

	  $scope.toggleAnimation = function () {
	    $scope.animationsEnabled = !$scope.animationsEnabled;
	  };

	  $scope.getFileType = function(){
	  	$scope.fileType = FileType.getObj();
	  		if($scope.fileType === ''){
	  			$location.path('files');
			    var modalInstance = $modal.open({
			      animation: $scope.animationsEnabled,
			      templateUrl: 'modules/files/views/modal.create.view.html',
			      controller: 'ModalInstanceCtrl',
			      size: 'lg',
			    });	  	  			
	  		}
		
	  };

	  $scope.show_language = false;
	  $scope.setShowLanguage = function(){

	  	$scope.show_language = !$scope.show_language;
	  };
	  $scope.showRTF = 0;
	  $scope.createRTF = function(){
	  	$http.post('/files/createRTF', $scope.file).success(function(response){
            /* jshint ignore: start */
           	toastr.success('RTF file made');
            /* jshint ignore: end*/
	  		$scope.showRTF = 1;

	  	});
	  };

	  $scope.showASCII = 0;
	  $scope.createASCII = function(){
	  	$http.post('/files/createASCII', $scope.file).success(function(response){
            /* jshint ignore: start */
           	toastr.success('ASCII file made');
            /* jshint ignore: end*/			
		
	  		$scope.showASCII = 1;

	  	});
	  };

	}
])


.controller('ModalInstanceCtrl',function ($scope, $modalInstance, $location) {


	  $scope.close = function(){
	  	$modalInstance.close();
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});