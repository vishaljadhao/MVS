//PartnerSortService

(function(window,mapster){
	'use_strict';

	var geocoder = mapster.geoCoder;	

	var PartnerSortService = function() {

		this.flag = false;
		
		var sortedData = [];

		this.saveSortPartners = function(partners) {
			sortedData.length = 0;					
			this.flag = true;
			sortedData.push(partners);
		};		

		this.getSortPartners = function() {
			return sortedData;
		};

	};	

	clientApp.service('PartnerSortService', PartnerSortService);

}(window,mapster));
