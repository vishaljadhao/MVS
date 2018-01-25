//PopUpFactory

(function(){
	
	'use_strict';

	var injectParams = ['$uibModal'];

	var PopUpFactory = function($uibModal){    
			return {
		      open: function(size, template, params) {
		        return $uibModal.open({
		          animation: true,
		          templateUrl: template || 'myModalContent.html',
		          controller: 'ModalResultInstanceCtrl',
		          size: size,
		          resolve: {
		            params: function() {
		              return params;
		            }
		          }
		        });
		      }
		    };
	};

	PopUpFactory.$inject = injectParams;
	clientApp.factory('PopUpFactory', PopUpFactory);

}());

