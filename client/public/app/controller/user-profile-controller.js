// User Profile Controller

(function(){
	'use_strict';

	var injectParams = ['$scope','$http']; 

	var UserProfileController = function($scope,$http) {	 		
	 		
	 		$scope.profileData;
	 		
	 		//This will hide the DIV by default.
            $scope.IsVisible = false;
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = $scope.IsVisible ? false : true;
            };

            $scope.updateProfile = function() {
				$scope.IsVisible = false;				
				var url = '/api/aspirants/user/update-profile';
				var data = $scope.profileData;				
				var config = {
	                headers : {
	                    'Content-Type': 'application/json'
	                }
	            };	            
				$http.put(url, data, config)
	            .success(function (data, status, headers, config) {	
	            	$scope.profileData = {
	            		fullName : data.fullName,
	            		phone: parseInt(data.phone),
	            		email: data.email
	            	};	            	
	            })
	            .error(function (reason, status, header, config) {
	            	console.log(reason);
	            });
			};

	};

	UserProfileController.$inject = injectParams;
  	clientApp.controller('UserProfileController', UserProfileController);

}());