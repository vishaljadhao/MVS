//RadiusService Service

(function(){
	'use_strict';

	var injectParams = [];

	var RadiusService = function() {		

		var Radius = {
			radius : 2
		};

		this.getRadius = function() {											
			return Radius.radius;
		};

		this.setRadius = function(rad) {
			Radius.radius = rad;
		};

	};	

	RadiusService.$inject = injectParams;
	clientApp.service('RadiusService', RadiusService);

}());
