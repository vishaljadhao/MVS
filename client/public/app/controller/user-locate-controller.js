(function(window,mapster){
	
	'use_strict';	

	var map = mapster.map;

	var marker;	

	var custIcon = mapster.custIcon;

	var injectParams = ['$scope','$rootScope','UserLocation','DrawCircle','GeoCodeAddress','PlotLocations','PartnerSortService','$window','$timeout']; 	

	var UserLocationCtrl = function($scope,$rootScope,UserLocation,DrawCircle,GeoCodeAddress,PlotLocations,PartnerSortService,$window,$timeout) {		
		
		// Get all partners data from local storage
        var allPartners;
        var allPartnersData;
        if($window.localStorage['GAPD']) {
           allPartners = $window.localStorage['GAPD'];
          if(!(allPartners == undefined) || !(allPartners == null)) {
            var partnersInformation = JSON.parse(allPartners);          
            var objectStatus = angular.equals({}, partnersInformation);        
            if(!objectStatus){          
                 allPartnersData = partnersInformation;    
            }    
          };
        } else {
          //Code for database call
        }

		$scope.locate = function() {				

			var userLocation = UserLocation.getCurrentLocation();
			userLocation.then(function(response){
				
				var userLatLng = response;

				 PlotLocations.plotLocation(allPartnersData,userLatLng,function(marker){        
	                  var geoJsonData = marker;                                      
	                  if(geoJsonData.length > 0) {
	                    PartnerSortService.saveSortPartners(geoJsonData);     
	                  }else {
	                    var emptyGeo = [];
	                    PartnerSortService.saveSortPartners(emptyGeo);                    
	                  }
	              });              
                     

				if(!marker) {
					marker = L.marker(userLatLng,{icon: custIcon});
					marker.addTo(map);
				}									
				
				GeoCodeAddress.getAddress(userLatLng, function(result){
					var formattedAddress = result[0].formatted_address;						
					var arrAddress = result[0].address_components;
			      	var itemLocality='';
			      	$.each(arrAddress, function (i, address_component) {
					    if (address_component.types[0] == "locality"){
					        itemLocality = address_component.long_name;
					        $timeout(function() {
							    $rootScope.cityVal = itemLocality; 
							});
					    }							 
					});
					marker.bindPopup("<div class='locate-popup'><p><strong>You are here</strong></p><span>" + formattedAddress + "</span></div>").openPopup();						
				});				

				DrawCircle.draw(userLatLng);		

			}, function(reason){
				alert(reason.message);
			});			            	

		};

	};

	UserLocationCtrl.$inject = injectParams;
  	clientApp.controller('UserLocationCtrl', UserLocationCtrl);

}(window,mapster));