//FormValidation Service

(function(){
	'use_strict';

	var FormValidation = function() {

		this.validate = function (info,event) {
			if(info) {
				event.preventDefault();
				return false
			}else {				
				return true
			}
		}

	};

	clientApp.service('FormValidation', FormValidation);

}());
