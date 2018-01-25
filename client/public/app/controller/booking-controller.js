(function() { 

  //Controller inject parameters   
  var injectParams = ['$scope','PartnerByIDFactory']; 
  
  var BookingController = function($scope,PartnerByIDFactory) {             

        //Get User Address Call
        partnerById = PartnerByIDFactory.getPartnerById();     
      
        partnerById.then(function(response){               
          $scope.partner = response;          
        }, function(reason) {
          console.log(reason);
        });         
      
        $scope.user = {
          'name': '',
          'address': '',
          'email': '',
          'password': ''
        };    

        $scope.success = function() {
           console.log($scope.UserInfo);
        }                        
      
  };

  BookingController.$inject = injectParams;
  clientApp.controller('BookingController', BookingController);

}());
