angular.module('login',['ngFacebook'])

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
                            }

                            $modalInstance.dismiss();
                        });
                    },
                    function(err) {
                        $modalInstance.dismiss();
                    });
            };

        }
    ]);