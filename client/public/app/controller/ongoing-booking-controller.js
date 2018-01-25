// OngoingBookingController

(function(){
	'use_strict';

	var injectParams = ['$scope']; 

	var OngoingBookingController = function($scope) {	 		
	 			 		
		$scope.isdiplay = false;

		$scope.showTracking = function() {
		    $scope.isdiplay = !$scope.isdiplay;
		}

	};

	OngoingBookingController.$inject = injectParams;
  	clientApp.controller('OngoingBookingController', OngoingBookingController);

}());