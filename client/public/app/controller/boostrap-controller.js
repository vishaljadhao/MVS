(function(){
	
	'use_strict';

	clientApp.controller('CollapseCtrl',
	 	['$scope', function($scope){

	 		$scope.isNavCollapsed = true;
			$scope.isCollapsed = false;
			$scope.isCollapsedHorizontal = false;

	}]);

	clientApp.controller('DropdownCtrl', ['$scope','$log', function($scope,$log){
		$scope.items = [
			'Dashboard',
			'My Account',
			'Logout'
		];
		$scope.status = {
		    isopen: false
		};
		$scope.toggled = function(open) {
			$log.log('Dropdown is now: ', open);
		};
		$scope.toggleDropdown = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.status.isopen = !$scope.status.isopen;
		};
		// $scope.appendToEl = angular.element(document.querySelector('#dropdown-long-content'));

	}]);
	clientApp.controller('TabsCtrl',['$scope', function($scope){
		$scope.tabs = [
		{ disableStatus: false},
		{ disableStatus: true},
		{ disableStatus: true},
		{ disableStatus: true}
		];
	}]);

	clientApp.controller('SignUpPopupCtrl',['$rootScope','$scope','$log','$uibModal', function ($rootScope, $scope, $log, $uibModal) {
	    
	    // var $scope = this;
	    // $scope.items = ['item1', 'item2', 'item3'];

	    $scope.animationsEnabled = true;
		$scope.open = function(size, template) {
	      var modalInstance = $uibModal.open({
	          animation: $scope.animationsEnabled,
	          templateUrl: template || 'signUptemplate.html',
	          controller: 'PopupControlsCtrl',
	          size: size,
	          windowTopClass: "signup-popup-wrapper"
        });

      /*modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });*/
    };
   		// $scope.open();
   		
	}]);

	clientApp.controller('PopupControlsCtrl',['$scope', '$uibModalInstance', 'PopUpFactory', function($scope, $uibModalInstance, PopUpFactory){
		$scope.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		$scope.toggle = function() {

			$scope.signUpstatus = ! $scope.signUpstatus;

		};
		$scope.signUpstatus = true;
	}]);

	
}());