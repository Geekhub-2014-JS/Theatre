angular.module('Login',['ngFacebook'])
    .config( function( $facebookProvider ) {
        $facebookProvider.setAppId('1835003956748098');
        $facebookProvider.setCustomInit({
            version: 'v2.1'
        });

        $facebookProvider.setPermissions('email');

    })
    .run( function( $rootScope ) {
        // Load the facebook SDK asynchronously
        (function(){
            if (document.getElementById('facebook-jssdk')) {return;}
            var firstScriptElement = document.getElementsByTagName('script')[0];
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';
            facebookJS.src = '//connect.facebook.net/en_US/all.js';
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());
    })
    .controller('LoginCtrl', ['$scope', '$rootScope', '$modal', '$facebook', 'apiPost', '$q',
        function($scope, $rootScope, $modal, $facebook, apiPost){
            $scope.isLoggedIn = false;
            $scope.login = function() {
                console.log('login try');
                $facebook.login().then(function() {
                    refresh();
                });
            }
            function refresh() {
                $facebook.api("/me?fields=id,first_name,last_name,email").then(
                    function(response) {
                        $rootScope.user=response;
                        FB.getLoginStatus(function(response) {
                            if (response.status === 'connected') {
                                $rootScope.user.uid = response.authResponse.userID;
                                $rootScope.user.accessToken = response.authResponse.accessToken;
                                apiPost('/customers/login',{"customer":{
                                 "id": $scope.user.id,
                                 "first_name": $rootScope.user.first_name,
                                 "last_name": $rootScope.user.last_name,
                                 "email": $rootScope.user.email
                                 },
                                 "api_key_token": $scope.user.accessToken
                                 }).then(function (response) {
                                     //do something with login in page
                                 },function (response) {
                                    //do something with error login in page
                                });
                            } else if (response.status === 'not_authorized') {
                                // the user is logged in to Facebook,
                                // but has not authenticated your app
                            } else {
                                // the user isn't logged in to Facebook.
                            }
                        });
                    },
                    function(err) {
                        $scope.welcomeMsg = "Please log in";
                    });
            };

        }
    ]);