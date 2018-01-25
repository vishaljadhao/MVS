//DistanceDurationFactory

(function(window,mapster){
	'use_strict';

	var distanceService = mapster.distanceService;
	var injectParams = ['$rootScope','$q'];

	var DistanceDurationFactory = function($rootScope,$q){
		
		var distanceDurationObj = {};
   
		distanceDurationObj.getDistance = function(src,dest) {
			source = src;
			destination = dest; 
			var d = $q.defer();
			distanceService.getDistanceMatrix({
				origins: [source],
				destinations: [destination],
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.METRIC,
				avoidHighways: false,
				avoidTolls: false
		   	}, function (response, status) {       
				if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
					d.resolve(response);
				} else {
					d.reject(status);             
				}
			});
				return d.promise;
			};
			return distanceDurationObj;
		};

	DistanceDurationFactory.$inject = injectParams;
	clientApp.factory('DistanceDurationFactory', DistanceDurationFactory);

}(window,mapster));