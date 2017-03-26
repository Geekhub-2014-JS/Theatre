angular.module('login',['ngFacebook'])
    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId('1835003956748098');
        $facebookProvider.setCustomInit({
            version: 'v2.1'
        });

        $facebookProvider.setPermissions('email');

    })
    .run( function( $rootScope ) {
        (function(){
            if (document.getElementById('facebook-jssdk')) {return;}
            var firstScriptElement = document.getElementsByTagName('script')[0];
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';
            facebookJS.src = '//connect.facebook.net/en_US/all.js';
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    })
    .controller('LoginCtrl', ['$scope', '$modalInstance','$rootScope', '$facebook', 'apiPost', 'userService',
        function($scope, $modalInstance, $rootScope, $facebook, apiPost, userService){
            $scope.login = function() {
                $facebook.login().then(function() {
                    refresh();
                });
            };
            function refresh() {
                $facebook.api("/me?fields=id,first_name,last_name,email").then(
                    function(response) {
                        userService.addUser(response);
                        FB.getLoginStatus(function(response) {

                            if (response.status === 'connected') {
                                userService.setApiToken(response.authResponse.accessToken);
                                userService.setNetwork('facebook');
                                /*$rootScope.user.accessToken = response.authResponse.accessToken;
                                $rootScope.user.network = 'facebook';*/
                            } else {
                                // the user isn't logged in to Facebook.
                            }

                            $modalInstance.dismiss();
                        });
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                    });
            };

        }
    ]);