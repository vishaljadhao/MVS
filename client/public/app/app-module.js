/*
* Application Modules
*
* Description
*/

var clientApp = angular.module('mvsApp', ['ui.bootstrap']);


// Run Block
var runInject = ['$log','__env','$rootScope'];

var run = function($log,__env,$rootScope) {
	
	$log.debug('Application bootstrapped!');
	$log.debug('Environment variables:');

	$rootScope.locateVal = true;
	$rootScope.cityVal = 'Pune';	
		 
    $rootScope.phone;	 
    $rootScope.location;
    $rootScope.centername;
    $rootScope.fare;
};

run.$inject = runInject;
clientApp.run(run);	

