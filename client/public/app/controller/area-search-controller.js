(function(window,mapster) { 

  //Map
  var map = mapster.map;      

  //Custom icon for area selection
  var custAreaIcon = mapster.custAreaIcon;


  //Controller inject parameters   
  var injectParams = ['$scope','$rootScope','AutoComplete','AreaSelectMarker','PlotLocations','PartnerSortService','$window','$timeout']; 
  
  var SearchController = function($scope,$rootScope,AutoComplete,AreaSelectMarker,PlotLocations,PartnerSortService,$window,$timeout) { 

        var autoComplete = AutoComplete.autoComplete();      

        // Get all partners data from local storage
        var allPartners;
        var allPartnersData;
        if($window.localStorage['GAPD']) {
           allPartners = $window.localStorage['GAPD'];
          if(!(allPartners == undefined) || !(allPartners == null)) {
            var partnersInformation = JSON.parse(allPartners);          
            var objectStatus = angular.equals({}, partnersInformation);        
            if(!objectStatus){          
                 allPartnersData = partnersInformation;    
            }    
          };
        } else {
          //Code for database call
        }

        if(autocomplete) {

          autoComplete.addListener('place_changed', function() {  

              // Get the place details from the autocomplete object.
              var place = autoComplete.getPlace();   

              var arrAddress = place.address_components;
              var itemLocality='';
              $.each(arrAddress, function (i, address_component) {
                if (address_component.types[0] == "locality") {
                  itemLocality = address_component.long_name;                  
                  $timeout(function() {
                      $rootScope.cityVal = itemLocality; 
                  });
                }              
              }); 

              var latlng = {
                  'lat': place.geometry.location.lat(),
                  'lng': place.geometry.location.lng()
              };  

              PlotLocations.plotLocation(allPartnersData,latlng,function(marker){        
                  var geoJsonData = marker;                                      
                  if(geoJsonData.length > 0) {
                    PartnerSortService.saveSortPartners(geoJsonData);     
                  }else {
                    var emptyGeo = [];
                    PartnerSortService.saveSortPartners(emptyGeo);                    
                  }
              });              
                                                    
              //Update marker on area select
              AreaSelectMarker.getUpdatedMarker(map,latlng,custAreaIcon);          

          });   

        };

        var searchedArea = $window.localStorage['searched'];   
                        
        if(!(searchedArea == undefined) || !(searchedArea == null)) {
          var searchedLatLng = JSON.parse(searchedArea);              
          var objectStatus = angular.equals({}, searchedLatLng);  

          PlotLocations.plotLocation(allPartnersData,searchedLatLng,function(marker){        
              var geoJsonData = marker;                 
              if(geoJsonData.length > 0) {
                PartnerSortService.saveSortPartners(geoJsonData);     
              }else {
                var emptyGeo = [];
                PartnerSortService.saveSortPartners(emptyGeo);                    
              }
          });           

          if(!objectStatus){          
            AreaSelectMarker.getUpdatedMarker(map,searchedLatLng,custAreaIcon);          
          }    
        };                          


    };

  SearchController.$inject = injectParams;
  clientApp.controller('SearchController', SearchController);

}(window,mapster));
