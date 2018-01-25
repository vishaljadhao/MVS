//UserAddressFactory

(function(){
	
	'use_strict';

	var injectParams = ['$http','$q'];

	var UserAddressFactory = function($http,$q){
	
		var UserAddressFactoryObj = {};

		UserAddressFactoryObj.getUserAddress = function() {

			var d = $q.defer();
			
			var getRequest = $http({
			       method:'GET',
			       url:'/api/aspirants/user/address'
			}).then(successCallback, errorCallback);

			function successCallback(res) {				
				d.resolve(res.data);
			};

			function errorCallback(reason) {
				d.reject(reason);   
			};

		   	return d.promise;

		};		

		return UserAddressFactoryObj;

	};

	UserAddressFactory.$inject = injectParams;
	clientApp.factory('UserAddressFactory', UserAddressFactory);

}());

