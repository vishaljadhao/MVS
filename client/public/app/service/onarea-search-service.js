//AreaSelectMarker Service

(function(){
  'use_strict';  

  var areaMarker;

  var injectParams = ['DrawCircle','$rootScope','RadiusService','GeoCodeAddress','$timeout'];

  var AreaSelectMarker = function(DrawCircle,$rootScope,RadiusService,GeoCodeAddress,$timeout) {

    this.getUpdatedMarker = function (map,latlng,custAreaIcon) {      

      var areaLatLng = latlng;   

      if(areaMarker) {
        areaMarker.setLatLng(areaLatLng);                
      }else {                
        areaMarker = new L.marker(areaLatLng,{icon: custAreaIcon});
        areaMarker.addTo(map);                  
      }        

      var distance = (RadiusService.getRadius());      

      GeoCodeAddress.getAddress(areaLatLng, function(result){                        
        var arrAddress = result[0].address_components;
        var itemLocality='';
        var itemSubLocality ='';
        var address = [];
        $.each(arrAddress, function (i, address_component) {           
          if (address_component.types[2] == "sublocality_level_1"){
                itemSubLocality = address_component.long_name;                
                address.push(' '+itemSubLocality);               
          }
          if (address_component.types[0] == "locality"){
              itemLocality = address_component.long_name;
              address.push(' '+itemLocality); 
              $timeout(function() {
                  $rootScope.cityVal = itemLocality; 
              });              
          }              
        });
        areaMarker.bindPopup("<div class='locate-popup'><span>" + address + "</span><span class='distance'> (within "+distance+" km)</span></div>").openPopup();
      });
      
      DrawCircle.draw(areaLatLng);      
            
    }

  };

  AreaSelectMarker.$inject = injectParams;
  clientApp.service('AreaSelectMarker', AreaSelectMarker);

}());
