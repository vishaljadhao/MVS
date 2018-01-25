/*
* Core Modules
*
* Description
*/

(function (window) {
 
 	// Default environment variables

	// Import variables if present
	if(window){
		Object.assign(__env, window.__env);
	}

	clientApp.constant('__env', __env);
	function DisableLogging($logProvider){
		$logProvider.debugEnabled(__env.enableDebug);
	}
	DisableLogging.$inject = ['$logProvider'];

	// Config Block
	clientApp.config(DisableLogging);

}(this));