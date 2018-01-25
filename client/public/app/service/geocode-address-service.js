//GeoCodeAddress Service

(function(window,mapster){
	'use_strict';

	var geocoder = mapster.geoCoder;	

	var GeoCodeAddress = function() {

		this.getAddress = function (latLng,callback) {					
			
			if(geocoder) {
				geocoder.geocode({
			      "location": latLng
			    }, function(results, status) {
			      if (status === "OK") {
			      	callback(results);
			      }else {
			        alert(":-(");
			      }
			    });
		    }		   

		}

	};	

	clientApp.service('GeoCodeAddress', GeoCodeAddress);

}(window,mapster));
