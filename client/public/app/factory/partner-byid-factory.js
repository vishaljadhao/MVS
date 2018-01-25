//PartnerByIDFactory

(function(){
	
	'use_strict';

	var injectParams = ['$http','$q'];

	var PartnerByIDFactory = function($http,$q){
	
		var PartnerByIDFactoryObj = {};

		PartnerByIDFactoryObj.getPartnerById = function() {
			var path = window.location.pathname;
			var id =  path.substring(path.lastIndexOf('/')  + 1);			
			var d = $q.defer();
			
			var getRequest = $http({
			       method:'GET',
			       url:'/api/providers/' + id
			}).then(successCallback, errorCallback);

			function successCallback(res) {				
				d.resolve(res.data);
			};

			function errorCallback(reason) {
				d.reject(reason);   
			};

		   	return d.promise;

		};		

		return PartnerByIDFactoryObj;

	};

	PartnerByIDFactory.$inject = injectParams;
	clientApp.factory('PartnerByIDFactory', PartnerByIDFactory);

}());

