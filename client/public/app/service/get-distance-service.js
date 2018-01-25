//DistanceService Service

(function(){
	'use_strict';

	var injectParams = ['DistanceDurationFactory']

	var DistanceService = function(DistanceDurationFactory) {

		this.getDistanceDuration = function (src,dest) {					

			var defferedObj = DistanceDurationFactory.getDistance(src,dest);
			
			defferedObj.then(function(response){
				var origins = response.originAddresses;
				var distanceDuration = {};
				for (var i = 0; i < origins.length; i++) {
					var results = response.rows[i].elements;
					for (var j = 0; j < results.length; j++) {
						distanceDuration = {
							distance : results[j].distance.text,
							duration : results[j].duration.text
						}                           
					}
				};
				// console.log(distanceDuration);				
				
			}, function(reason) {
				alert("Unable to find the distance via road.");            
			}); 

		}

	};

	DistanceService.$inject = injectParams;

	clientApp.service('DistanceService', DistanceService);

}());
