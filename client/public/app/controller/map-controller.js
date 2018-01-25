(function() { 

  //Controller inject parameters   
  var injectParams = ['$scope','$rootScope','$window','PartnerSortService']; 
  
  var MapController = function($scope,$rootScope,$window,PartnerSortService) {           

      // Filter Show Hide Functionality
      $scope.GridShow = false;
      $scope.MapShow = true;
      // $rootScope.locateVal = true;
      $scope.ShowGrid = function () {
        $scope.GridShow = true;
        $scope.MapShow = false; 
        // $rootScope.locateVal = false;       
      };
      $scope.ShowMap = function () {
        $scope.GridShow = false;
        $scope.MapShow = true;  
        // $rootScope.locateVal = true;      
      }; 

      $scope.$watch(function(){          
          return PartnerSortService.flag 
        }, function(newValue, oldValue) {                  
          $scope.geoJsonData = PartnerSortService.getSortPartners();
          angular.forEach($scope.geoJsonData, function(item) {                 
            $scope.gridItem = item;
            // Pagination Code 
            $scope.viewby = 2;
            $scope.totalItems = $scope.gridItem.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5; //Number of pager buttons to show

            $scope.viewItems = [2,4,6,8];

            $scope.pageChanged = function() {
              console.log('Page changed to: ' + $scope.currentPage);
            };
            $scope.setItemsPerPage = function(num) {
              $scope.itemsPerPage = num;
              $scope.currentPage = 1; //reset to first page
            }                                
          });
          PartnerSortService.flag = false;          
      });         

      // var allPartners = GetAllPartners.getPartners();  

      // var allPartners = $window.localStorage['GAPD'];   
                      
      // if(!(allPartners == undefined) || !(allPartners == null)) {
      //   var allPartnersData = JSON.parse(allPartners);          
      //   var objectStatus = angular.equals({}, allPartnersData);        

      //   if(!objectStatus){          
      //     PlotLocations.plotLocation(allPartnersData,function(marker){        
      //       var geoJsonData = marker;   
      //       $scope.gridItem = geoJsonData;            

      //       // Pagination Code 
      //       $scope.viewby = 2;
      //       $scope.totalItems = $scope.gridItem.length;
      //       $scope.currentPage = 1;
      //       $scope.itemsPerPage = $scope.viewby;
      //       $scope.maxSize = 5; //Number of pager buttons to show

      //       $scope.viewItems = [2,4,6,8];

      //       $scope.pageChanged = function() {
      //         console.log('Page changed to: ' + $scope.currentPage);
      //       };
      //       $scope.setItemsPerPage = function(num) {
      //         $scope.itemsPerPage = num;
      //         $scope.currentPage = 1; //reset to first page
      //       }         
      //     });         
      //   }    

      // };      
                                   
    };

  MapController.$inject = injectParams;
  clientApp.controller('MapController', MapController);

}());