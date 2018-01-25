// Auth Controller

(function(){
	'use_strict';

	var injectParams = ['$scope','$http','FormValidation','AutoComplete']; 	

	var PartnerSignUpController = function($scope,$http,FormValidation,AutoComplete) {	 		
			
			$scope.validateForm = function($event){
				$scope.submitted = true;

				//Code for Validation Service
				var event = $event;
				var info = $scope.PartnerSignUp.$invalid;
				FormValidation.validate(info,event);
				
			};

			var autoComplete = AutoComplete.autoComplete();			

			autoComplete.addListener('place_changed', function() {
				
				var place = autoComplete.getPlace();					
			    
			    if (!place.geometry) {
	                // Inform the user that the place was not found and return.
	                alert("Location not found");
	                return;
	            }            

	            // If the place has a geometry, then update the map
	            if (place.geometry.location) {	            	
	            	var arrAddress = place.address_components;
		            var itemLocality='';
						$.each(arrAddress, function (i, address_component) {
							if (address_component.types[0] == "locality") {
								itemLocality = address_component.long_name;		                  	
							}              
						});
	            }	  
			});
	};


	PartnerSignUpController.$inject = injectParams;
  	clientApp.controller('PartnerSignUpController', PartnerSignUpController);


  	var commonInjectParams = ['$scope','$http','FormValidation']; 	

  	var PartnerSignInController = function($scope,$http,FormValidation) {

	 		$scope.validateForm = function($event){
	 			$scope.submitted = true;
				var event = $event;
				var info = $scope.PartnerSignIn.$invalid;
				FormValidation.validate(info,event);
			}

	};
	PartnerSignInController.$inject = commonInjectParams;
  	clientApp.controller('PartnerSignInController', PartnerSignInController);



  	var registerParams = ['$scope','$http','FormValidation','UserLocation','GeoCodeAddress','$timeout']; 	

  	var PartnerRegisterController = function($scope,$http,FormValidation,UserLocation,GeoCodeAddress,$timeout) {

  			$scope.GetCurrentLocation = function() {
  				var userLocation = UserLocation.getCurrentLocation();
				userLocation.then(function(response){					
					var userLatLng = response;
					var partnerLatLng = JSON.stringify(userLatLng);	
					$('#partnerLatLng').val(partnerLatLng);
					GeoCodeAddress.getAddress(userLatLng, function(result){							
						$timeout( function() {
							$scope.address = result[0].formatted_address;													
							if($scope.address) {
								$('.current-location-div').fadeIn('slow');
							}
						});
					});											

				}, function(reason){
					alert(reason.message);
				});					

  			};  			

  			paramsObject = {};
			window.location.search.replace(/\?/,'').split('&').map(function(o){ paramsObject[o.split('=')[0]]= o.split('=')[1]});  			

  			Object.size = function(obj) {
			    var size = 0, key;
			    for (key in obj) {
			        if (obj.hasOwnProperty(key)) size++;
			    }
			    return size;
			};

			// Get the size of an object
			var size = Object.size(paramsObject);			

  			if(size>1){
	  			$scope.phone = parseInt(paramsObject.phone);
				$scope.locality = decodeURIComponent(paramsObject.locality).replace(/\+/g, "");
			}

	 		$scope.validateForm = function($event){
	 			$scope.submitted = true;
				var event = $event;
				var info = $scope.PartnerRegister.$invalid;
				FormValidation.validate(info,event);
				setTimeout(function() {
					$('html,body').animate({
						scrollTop: $('.has-error').offset().top
					});					
				},300);				
			}

	};
	PartnerRegisterController.$inject = registerParams;
  	clientApp.controller('PartnerRegisterController', PartnerRegisterController);


}());