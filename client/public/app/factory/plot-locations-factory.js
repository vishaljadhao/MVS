//PlotLocations

(function(window,mapster){
	'use_strict';

	//Map
    map = mapster.map;    

    //Map marker cluster
    markers = mapster.markerCluster;

    //Map marker group
    group = mapster.group;     

	var injectParams = ['GeoCodeAddress','LeafletSidebar','PartnersFromSearch'];
	
	var PlotLocations = function(GeoCodeAddress,LeafletSidebar,PartnersFromSearch) {
          	
        var locations = {};        
		
		locations.plotLocation = function(locationData,searchedArea,callback) {			
			// Require only array of object	
			markers.clearLayers();
			var marker;
          	var latLng;
          	var allmarkers = [];  

          	// PartnersFromSearch.provideSearchedArea(searchedArea);        	
			PartnersFromSearch.provideInformation(searchedArea,locationData);	

			var sortedMarkers = PartnersFromSearch.getNewMarkers();				

			if(sortedMarkers.length > 0) {				
	      		angular.forEach(sortedMarkers, function(item, key) {				      			

	      			var latLng = item._latlng;			    			      			              	            		                        	           
				    				
					marker = new L.marker(latLng);				

					markers.addLayer(marker);

					var itemDetails = {
						'id' : item.id,
						'fullName' : item.fullName,
						'phone' : item.phone,
						'ServiceCenterName': item.ServiceCenterName,
						'BasicServicingFare': item.BasicServicingFare,
						'Area': item.Area
					};				

					var popupStyle = "<div class='popup-style'><div class='right'><span class='center-name'>"+item.ServiceCenterName+"</span><span class='ratings'>4.5*</span></div></div>";              
				
					marker.fullName = itemDetails.fullName;
					marker.phone = itemDetails.phone;
					marker.id = itemDetails.id;
					marker.ServiceCenterName = itemDetails.ServiceCenterName;
					marker.BasicServicingFare = itemDetails.BasicServicingFare;
					marker.Area = itemDetails.Area;				
					
					GeoCodeAddress.getAddress(latLng, function(result){
						formattedAddress = result[0].formatted_address;	
						marker.address = 'formattedAddress';					
				    });	
					
					marker.bindPopup(popupStyle);
					// marker.on('mouseover', function (e) {
					// 	this.openPopup();
					// });
					// marker.on('mouseout', function (e) {
					// 	this.closePopup();
					// });  				

	          		LeafletSidebar.displaySidebar(marker);
	          		allmarkers.push(marker); 

	          	});
			}else{
				alert("no data found");
			}
          	markers.addTo(map);
          	// map.fitBounds(group.getBounds());			
			callback(allmarkers);
		};	
		
		return locations;
		
	};	

	PlotLocations.$inject = injectParams;
	clientApp.service('PlotLocations', PlotLocations);	

}(window,mapster));