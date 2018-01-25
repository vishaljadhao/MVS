//GetAllPartners

(function(){
	'use_strict';

	var injectParams = ['PartnerFactory','$window']; 
	
	var GetAllPartners = function(PartnerFactory,$window){

		var allPartners;
		var partnerDataResponse;
		
		this.initialize = function() {					
			partners = PartnerFactory.getPartnerData();						
			// allPartners = partners;
			
			partners.then(function(response){
				partnerDataResponse = response;				
				if($window.localStorage) {						
					$window.localStorage['GAPD'] = angular.toJson(partnerDataResponse);
				}else {
					// Need to implement fallback here if localstorage is not supported
					alert('LocalStorage is not supported..');
				}
			}, function(reason) {
				console.log(reason);
			});
			
		};

		this.getPartners = function() {			
			return allPartners;			
		};		
		
	};	

	GetAllPartners.$inject = injectParams;
	clientApp.service('GetAllPartners', GetAllPartners);	

}());