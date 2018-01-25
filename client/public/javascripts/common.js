(function(window){

  'use_strict';

  /*
      JS Document for ProjectIGI
  */

  var AppSettings = {
      DEBUGMODE: true //change to turn on/off console.log statements
  };

  var Main = {
      run: function () {
          Debug.log("Add run code to Main.run:function();");        
          clearInput.init();
          markerActiveFun.init();          
      },
      scroll: function(){        
      },
      resize: function(){      
      }
  };

  var Debug = {

      log: function (str) {
          /// <summary>Wrapper for console.log to enable intellisense</summary>
          /// <param name="str" type="String">Value to log in the console</param>
          if (AppSettings.DEBUGMODE) {
              try {  }
              catch (e) { }
          }
      }

  };

  var clearInput = {
    init: function() {
        $('#pac-input').on('keyup', function() {
          clearBtn.style.visibility = (this.value.length) ? "visible" : "hidden";
        });
        $('#clearBtn').on('click', function() {
          this.style.visibility = "hidden";
          $('#pac-input').val('');
        });        
    }
  };

  var markerActiveFun = {
    init: function() {
      $(document).on('click','.leaflet-marker-icon', function() {
        $(this).addClass('active').siblings().removeClass('active');
      });
    }
  };  

  $(document).ready(Main.run());


  $(window).scroll(function(){
      Main.scroll();
  });

  $(window).resize(function(){
      Main.resize();
  });

}(window));