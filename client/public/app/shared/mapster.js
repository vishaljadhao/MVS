(function(window, mapster) {
	'use_strict';

	var location = window.location.pathname;

	//Google reverse Geocoding
	mapster.geoCoder = new google.maps.Geocoder;

	//Distance Matrix Service
	mapster.distanceService = new google.maps.DistanceMatrixService();
	
	if($('div').hasClass('map-canvas')) {

		//Map Element
		mapster.mapElm = 'mapCanvas';

		//Map Style
		mapster.style = {

		};

		//Map options
		mapster.mapOptions = {
			center: [20.5937, 78.9629],
			zoomControl: false,
		    zoom: 8,
		    minZoom: 6,
		    maxZoom: 17,
		    doubleClickZoom: false
		};

		mapster.map = L.map(mapster.mapElm, mapster.mapOptions);				

		//Zoom control position
		mapster.zoomCtrl = L.control.zoom({
			position:'bottomright'
		}).addTo(mapster.map);		

		//Marker Cluster
		mapster.markerCluster = L.markerClusterGroup({
			showCoverageOnHover: false
		});

		//Marker group
		mapster.group = new L.featureGroup([mapster.markerCluster]);

		//Leaflet With Google map layer
		mapster.roadmap = L.gridLayer.googleMutant({
			type: 'roadmap', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
		}).addTo(mapster.map);	
		
		//Mapbox
		// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic2t5d2Fsa2VyMTQzNyIsImEiOiJjaXdkYzh4aWswYzZjMnh0ZHp1bjNpejN4In0.7B3M9nMfUS-yO0y0cJ5oRQ', {
		// 	id: 'mapbox.streets'
		// }).addTo(mapster.map);
		
		//OSM
		// mapster.tile = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{
		// 	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		// }).addTo(mapster.map);
		
		// To solve loading tiles issue	
		setTimeout(function(){
			var evt = document.createEvent("HTMLEvents");
		    evt.initEvent('resize', true, false);
		    window.dispatchEvent(evt);
			mapster.map.invalidateSize(false); 
			mapster.map.zoomOut();			
			//mapster.map._onResize()
		},1000);		
		
		//Leaflet slider
		mapster.sidebarElm = 'sidebar';
		mapster.sidebarOptions = {
			closeButton: true,
			position: 'left',
			autoPan: true,
		};
		mapster.sidebar = L.control.sidebar(mapster.sidebarElm, mapster.sidebarOptions);
		mapster.map.addControl(mapster.sidebar);		

		//Current Location Icon
		mapster.custIcon = L.icon({
		    iconUrl: '/images/current-location.png',
		    iconSize:     [30, 30], // size of the icon
		    //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
		    //shadowAnchor: [4, 62],  // the same for the shadow
		    popupAnchor:  [0, -20] // point from which the popup should open relative to the iconAnchor
		});

		//Area Select Icon		
		mapster.custAreaIcon = L.icon({
		    iconUrl: '/images/area-select-marker.png',
		    iconSize:     [30, 40], // size of the icon
		    iconAnchor:   [10, 40], // point of the icon which will correspond to marker's location
		    popupAnchor:  [3, -40] // point from which the popup should open relative to the iconAnchor
		});		

	}

}(window, window.mapster || (window.mapster = {})))
