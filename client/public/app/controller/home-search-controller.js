// HomeSearchController

(function(){
	'use_strict';

	var injectParams = ['$scope','$rootScope','FormValidation','AutoComplete','GetAllPartners','$window','$timeout']; 	

	var HomeSearchController = function($scope,$rootScope,FormValidation,AutoComplete,GetAllPartners,$window,$timeout) {	 		

			var selectedAreaLatLng = {};
						
			var autoComplete = AutoComplete.autoComplete();			

			autoComplete.addListener('place_changed', function() {
				
				var place = autoComplete.getPlace();	

				var arrAddress = place.address_components;
	            var itemLocality='';
	              $.each(arrAddress, function (i, address_component) {
	                if (address_component.types[0] == "locality") {
	                  itemLocality = address_component.long_name;                  	                  
	                  	$timeout(function() {
						    $rootScope.cityVal = itemLocality; 
						});
	                }              
	              }); 			
			    
			    if (!place.geometry) {
	                // Inform the user that the place was not found and return.
	                alert("Location not found");
	                return;
	            }            
	            
	            if (place.geometry.location) {

	            	var lat = place.geometry.location.lat();
	            	var lng = place.geometry.location.lng();
	            	selectedAreaLatLng = {
	            		'lat': lat,
	            		'lng': lng
	            	};

	            }	  
			});

			$scope.searchArea = function() {	
				GetAllPartners.initialize();			
				$window.localStorage.clear();				
				$window.localStorage['searched'] = angular.toJson(selectedAreaLatLng);
				$timeout(function() {
				    angular.element('#authBtn').triggerHandler('click');
				});				
			}
	};


	HomeSearchController.$inject = injectParams;
  	clientApp.controller('HomeSearchController', HomeSearchController);  	


}());