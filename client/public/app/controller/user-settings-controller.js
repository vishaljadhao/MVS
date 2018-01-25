// User Profile Controller

(function(){
	'use_strict';

	var injectParams = ['$scope','$http','UserAddressFactory']; 

	var UserSettingsController = function($scope,$http,UserAddressFactory) {

			$scope.Address;

            $scope.IsVisible = false;
            
			//This will hide the DIV by default.
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };

            //Get User Address Call
            getUserAddress = UserAddressFactory.getUserAddress();			
			
			getUserAddress.then(function(response){								
				var data = response[0];					
				if(data.hasOwnProperty('ZipCode')) {
					$scope.Address = {
	            		addressLine1: data.addressLine1,
	            		addressLine2: data.addressLine2,
	            		City: data.City,
	            		State: data.State,
	            		ZipCode: parseInt(data.ZipCode)
	            	};	
            	}				
			}, function(reason) {
				console.log(reason);
			});   			
	 			 			

	 		$scope.UpdateAddress = function() {
				$scope.IsVisible = false;				

				var url = '/api/aspirants/user/update-address';
				var data = $scope.Address;				
				var config = {
	                headers : {
	                    'Content-Type': 'application/json'
	                }
	            };		            	                      
				$http.put(url, data, config)
	            .success(function (data, status, headers, config) {	
	            	$scope.Address = {
	            		addressLine1: data.addressLine1,
	            		addressLine2: data.addressLine2,
	            		City: data.City,
	            		State: data.State,
	            		ZipCode: parseInt(data.ZipCode)
	            	};	            	
	            })
	            .error(function (reason, status, header, config) {
	            	console.log(reason);
	            });				
			};		

	};

	UserSettingsController.$inject = injectParams;
  	clientApp.controller('UserSettingsController', UserSettingsController);

}());