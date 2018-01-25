//DrawCircle Service

(function(window,mapster){
	'use_strict';

	var map = mapster.map;
	var circle;

	var injectParams = ['RadiusService','$timeout'];

	var DrawCircle = function(RadiusService,$timeout) {

		var radius = RadiusService.getRadius();

		radius = radius * 1000;

		this.draw = function (latLng) {											
						
			if(circle != undefined) {								
				map.removeLayer(circle);								
				circle = L.circle(latLng, radius, {
					opacity: 0.35,
					fillColor: '#668490',
		            fillOpacity: 0.15
				}).addTo(map);	    		
			} else {				
				circle = L.circle(latLng, radius, {
					opacity: 0.35,
					fillColor: '#668490',
		            fillOpacity: 0.15
				}).addTo(map);
			}

	    	var zoom = 14;       
      		map.setView(latLng,zoom);

	    	// map.fitBounds(circle.getBounds());

	    	// $timeout(function(){
		    //     map.zoomOut();         
		    // },300);
		};		

	};	

	DrawCircle.$inject = injectParams;
	clientApp.service('DrawCircle', DrawCircle);

}(window,mapster));
