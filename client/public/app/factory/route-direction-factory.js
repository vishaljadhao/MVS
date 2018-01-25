//RouteDirectionFactory

(function(){
	'use_strict';

	var location = window.location.pathname;
	var map;

	if(location === '/test') {
		//Map Element
		mapElm = document.getElementById('testCanvas');
		//Map center
		center = new google.maps.LatLng(20.5937, 78.9629);
		//Map options
		mapOptions = {
			center: center,
			zoom: 8		   
		};
		
		map = new google.maps.Map(mapElm, mapOptions);

	}

	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': false });

	var directionList = document.getElementById('directionList');

	var RouteDirectionFactory = function(){
		var routeDirectionObj = {};
	   
		routeDirectionObj.getRoute = function(src,dest) {
			source = src;
			destination = dest;      
			directionsDisplay.setMap(map);
			var request = {
		       origin: source,
		       destination: destination,
		       travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function (response, status) {
		       if (status == google.maps.DirectionsStatus.OK) {
		           directionsDisplay.setDirections(response);
		           directionsDisplay.setPanel(directionList);
		       }
		   });
		};
		return routeDirectionObj;
	};
	clientApp.factory('RouteDirectionFactory', RouteDirectionFactory);

}());

