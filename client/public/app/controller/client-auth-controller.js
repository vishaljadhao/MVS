// Auth Controller

(function(){

	'use_strict';

	var commonInjectParams = ['$scope','$http','FormValidation'];


	var SignInController = function($scope,$http,FormValidation) {

	 		$scope.validateForm = function($event){
	 			$scope.submitted = true;
				var event = $event;
				var info = $scope.signIn.$invalid;
				FormValidation.validate(info,event);
			}

	};
	SignInController.$inject = commonInjectParams;
  	clientApp.controller('SignInController', SignInController);


	var SignUpController = function($scope,$http,FormValidation) {

	 		$scope.hidePass = false;
			
			$scope.validateForm = function($event){
				$scope.submitted = true;

				//Code for Validation Service
				var event = $event;
				var info = $scope.signUp.$invalid;
				FormValidation.validate(info,event);
				
			}

	};
	SignUpController.$inject = commonInjectParams;
  	clientApp.controller('SignUpController', SignUpController);


	var ForgotPassController = function($scope,$http,FormValidation) {
			
			$scope.validateForm = function($event){
				$scope.submitted = true;
				var event = $event;
				var info = $scope.forgotForm.$invalid;
				FormValidation.validate(info,event);
			}

	};
	ForgotPassController.$inject = commonInjectParams;
  	clientApp.controller('ForgotPassController', ForgotPassController);


	var ResetPassController = function($scope,$http,FormValidation) {
			
			$scope.validateForm = function($event){
				$scope.submitted = true;
				var event = $event;
				var info = $scope.resetForm.$invalid;
				FormValidation.validate(info,event);
			}

	};
	SignUpController.$inject = commonInjectParams;
  	clientApp.controller('SignUpController', SignUpController);


}());