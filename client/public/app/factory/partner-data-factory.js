//PartnerFactory

(function(){
	
	'use_strict';

	var injectParams = ['$http','$q'];

	var PartnerFactory = function($http,$q){
	
		var PartnerFactoryObj = {};

		PartnerFactoryObj.getPartnerData = function() {

			var d = $q.defer();
			
			var getRequest = $http({
			       method:'GET',
			       url:'/api/providers'
			}).then(successCallback, errorCallback);

			function successCallback(res) {
				d.resolve(res.data);
			};

			function errorCallback(reason) {
				d.reject(reason);   
			};

		   	return d.promise;

		};

		return PartnerFactoryObj;

	};

	PartnerFactory.$inject = injectParams;
	clientApp.factory('PartnerFactory', PartnerFactory);

}());

