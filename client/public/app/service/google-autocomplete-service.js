//AutoComplete Service

(function(){
	
	'use_strict';

	var AutoComplete = function() {
					
		pacInput = document.getElementById('pac-input');
		autoOptions = {
			types:['geocode'],
			strictBounds: true,
			componentRestrictions: {country: 'IN'}
		};

		this.autoComplete = function (info,event) {			
			//Autocomplete
			return autocomplete = new google.maps.places.Autocomplete(pacInput,autoOptions);
		};

		this.pacSelectFirst = (function pacSelectFirst(input){
	        // store the original event binding function
	        var _addEventListener = (input.addEventListener) ? input.addEventListener : input.attachEvent;
			function addEventListenerWrapper(type, listener) {
	        // Simulate a 'down arrow' keypress on hitting 'return' when no pac suggestion is selected,
	        // and then trigger the original listener.		        
	        if (type == "keydown") {
	          var orig_listener = listener;
	          listener = function (event) {
	            var suggestion_selected = $(".pac-item-selected").length > 0;
	            if (((event.which == 13 || event.which == 40) && !suggestion_selected)) {
	            	if(event.which == 13) {
	            		event.preventDefault();
	            	}
	              	var simulated_downarrow = $.Event("keydown", {keyCode:40, which:40})
	              	orig_listener.apply(input, [simulated_downarrow]);
	            }
	            orig_listener.apply(input, [event]);
	          };
	        }
	        // add the modified listener
	        _addEventListener.apply(input, [type, listener]);
	      }
	      if (input.addEventListener)
	        input.addEventListener = addEventListenerWrapper;
	      else if (input.attachEvent)
	        input.attachEvent = addEventListenerWrapper;
	    })(pacInput);

	};

	clientApp.service('AutoComplete', AutoComplete);

}());
