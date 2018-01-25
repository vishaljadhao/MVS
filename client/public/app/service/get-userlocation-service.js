//UserLocation Service

(function(window,mapster){
	'use_strict';

	var injectParams = ['$q'];

	var UserLocation = function($q) {		

		this.getCurrentLocation = function () {

			var d = $q.defer();										

			if(navigator && navigator.geolocation) {											

				function onLocationFound(position) {					
					var pos = {
		              	lat: position.coords.latitude,
		              	lng: position.coords.longitude
		            };		            										
					d.resolve(pos);					
				};

				function onLocationError(reason) {
					d.reject(reason);
				};
				
				var geoOptions = {
				    maximumAge: 5 * 60 * 1000,
				    timeout: 10 * 1000,
				    enableHighAccuracy: true
				};
				
				navigator.geolocation.getCurrentPosition(
					onLocationFound,
					onLocationError,
					{geoOptions}
				);

			}else {
				alert('your browser does not support Geolocation');
			}

			return d.promise;

		}

	};	

	UserLocation.$inject = injectParams;
	clientApp.service('UserLocation', UserLocation);

}(window,mapster));
