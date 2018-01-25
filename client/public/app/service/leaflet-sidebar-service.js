//LeafletSidebar

(function(){
	'use_strict';

	//Map Sidebar   
    sidebar = mapster.sidebar;

	var injectParams = ['$rootScope']; 
	
	var LeafletSidebar = function($rootScope){


		var sidebarDetails = [];

		this.displaySidebar = function(marker) {	

			marker.on({
            	click: clickHandler
          	});

          	function clickHandler(e) {          		
	            var el = e.srcElement || e.target;

	            sidebarObj = {
	            	'id' : el.id,	            
	            	'address' : el.Area,
	            	'fullName' : el.fullName,
	            	'ServiceCenterName' : el.ServiceCenterName,
	            	'phone' : el.phone,
	            	'fare': el.BasicServicingFare
	            };              	
            	
	            $rootScope.$apply(function(){
	        		$rootScope.location = sidebarObj.address; 
		            $rootScope.centername = sidebarObj.ServiceCenterName;		            
		            $rootScope.fare = sidebarObj.fare;
		            $rootScope.id = sidebarObj.id;
		            $rootScope.fullName = sidebarObj.fullName;
		            $rootScope.phone = sidebarObj.phone;
              	});   


	            sidebarDetails.push(sidebarObj);	            

	            var visible = sidebar.isVisible(); 
	            var panLatLng = e.latlng;	                                   	            
	            sidebar.show();                     
	            if(!visible) {
	              map.setView(panLatLng);
	            };
	            map.on('click', function () {
	                sidebar.hide();
	            });
          	}          	
		};						
	};	

	LeafletSidebar.$inject = injectParams;
	clientApp.service('LeafletSidebar', LeafletSidebar);	

}());
