//PartnersFromSearch

(function(window,mapster){
	'use_strict';

	var map = mapster.map;	

	var injectParams = ['RadiusService']; 

	var PartnersFromSearch = function(RadiusService) {	

		var radius_km = RadiusService.getRadius();

		var allMarkers = [];

		// var searchedLatLng;

		// this.provideSearchedArea = function(searchedArea) {
		// 	searchedLatLng = searchedArea;
		// };			

		this.provideInformation = function(searchedArea,markers) {
			var allLocations = markers;						
			var searchedLatLng = new google.maps.LatLng(searchedArea.lat, searchedArea.lng);

			allMarkers.length = 0;
			
			angular.forEach(allLocations, function(item) {				
				
				latLng = {
	               'lat':parseFloat(item.coordinates.Lat),
	               'lng':parseFloat(item.coordinates.Lng)
	            };	
	            
				var marker_lat_lng = new google.maps.LatLng(latLng.lat, latLng.lng);					
				
				var distance_from_location = google.maps.geometry.spherical.computeDistanceBetween(searchedLatLng, marker_lat_lng); //distance in meters between your location and the marker				

				if (distance_from_location <= radius_km * 1000) {

					var itemDetails = {
						'id' : item._id,
						'fullName' : item.fullName,
						'phone' : item.phone,
						'ServiceCenterName': item.ServiceCenterName,
						'BasicServicingFare': item.BasicServicingFare,
						'Area': item.Area
					};					

					var newMarkerLatLng = {
						'lat': marker_lat_lng.lat(),
						'lng': marker_lat_lng.lng()
					};
	            				
					var newMarker = new L.marker(newMarkerLatLng);		

					newMarker.fullName = itemDetails.fullName;
					newMarker.phone = itemDetails.phone;
					newMarker.id = itemDetails.id;
					newMarker.ServiceCenterName = itemDetails.ServiceCenterName;
					newMarker.BasicServicingFare = itemDetails.BasicServicingFare;
					newMarker.Area = itemDetails.Area;	
					newMarker.distance = distance_from_location;					

					allMarkers.push(newMarker);	            	
					// console.log("is " + distance_from_location + " meters from my location")	  				
	  			}	 	  			  				
			});
		};

		this.getNewMarkers = function() {
			return allMarkers;
		}

	};
		
	PartnersFromSearch.$inject = injectParams;
	clientApp.service('PartnersFromSearch', PartnersFromSearch);

}(window,mapster));
