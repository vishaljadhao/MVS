(function() {

    'use_strict'

    clientApp.directive(
            "cusShowDir",
            function() {
                function link( $scope, element, attributes ) {
                    var expression = attributes.cusShowDir;
                    var duration = ( attributes.slideShowDuration || "fast" );


                    if ( ! $scope.$eval( expression ) ) {

                        element.hide();

                    }

                    $scope.$watch(
                        expression,
                        function( newValue, oldValue ) {

                            if ( newValue === oldValue ) {

                                return;

                            }

                            if ( newValue ) {

                                element
                                    .stop( true, true )
                                    .slideDown( duration )
                                ;

                            } else {

                                element
                                    .stop( true, true )
                                    .slideUp( duration )
                                ;

                            }

                        }
                    );

                }

                return({
                    link: link,
                    restrict: "A"
                });

            }
        );

}());
