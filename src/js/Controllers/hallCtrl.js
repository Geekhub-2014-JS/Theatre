angular.module('hall', ['ngFacebook','ui.bootstrap'])

    .controller('HallCtrl', ['$scope', '$modal', '$rootScope', 'hallService', 'cartService', 'perfomanceService', 'userService', 'apiPost',
        function ($scope, $modal, $rootScope, hallService, cartService, perfomanceService, userService, apiPost) {
            var hallConst = {
                "Черкаська Філармонія": "Filarmonia",
                "Будинок культури ім. Кулика": "Kulyka",
                "Черкаський Театр": "",
                "Кінотеатр 'Салют'": "",
                "Черкаський міський Палац молоді": "Palace_youth",
                "Центр дитячої та юнацької творчості": "",
                "Черкаський обласний художній музей":""
            };

            var selectedVenue = perfomanceService.getPerfomance().venue;

            for (var key in hallConst) {
                if (key === selectedVenue) selectedVenue = hallConst[key]
            }

            hallService.setHall(selectedVenue);

            $scope.getUrl = function () {
                return hallService.gethall();
            };

            $scope.addToCart = function (data) {
                cartService.addPlaceToCart(data);
                $scope.$apply();
            };

            $modal.open({
                templateUrl: 'views/shared/login.html',
                windowClass: 'modal',
                controller: 'LoginCtrl'
            }).result.finally(function(){
                //if (!$rootScope.user) $rootScope.user={}; //Todo change to object
                apiPost('customers/login',{
                    "first_name": userService.getCurrentUser().first_name, //Todo to service
                    "last_name": userService.getCurrentUser().last_name,
                    "email": userService.getCurrentUser().email,
                    "social_network": userService.getCurrentUser().network,
                    "social_token": userService.getCurrentUser().accessToken
                }).then(function (response) {
                    //do something with login in page
                },function (response) {
                    //do something with error login in page
                });
            });
        }

    ])
    .controller('TimerCtrl', ['$scope', '$interval', 'cartService',
        function ($scope, $interval, cartService) {
            var timerInterval;   //todo rewrite with $interval
            var endTime;

            $scope.isCartEmpty=function () {
                $scope.startTimer();
                return cartService.getPlaceToCart().length;
            };

            $scope.timer=0;

            $scope.stopTimer=function () {
                $interval.cancel(timerInterval)
            };

            $scope.startTimer=function () {
                if (cartService.getPlaceToCart().length&&!timerInterval) {
                    endTime=new Date();
                    endTime.setMinutes(endTime.getMinutes()+15);
                    timerInterval=$interval(function () {
                        $scope.timer=getTimeRemaining(endTime);
                    },1000)
                } else if (!cartService.getPlaceToCart().length) {
                    $interval.cancel(timerInterval);
                    timerInterval=0;
                    $scope.timer=0;
                }
            };

            $scope.$on('$destroy',function () {
                $interval.cancel(timerInterval);
            });

            function getTimeRemaining(endtime){
                var t = Date.parse(endtime) - Date.parse(new Date());
                var seconds = Math.floor( (t/1000) % 60 );
                var minutes = Math.floor( (t/1000/60) % 60 );
                var hours = Math.floor( (t/(1000*60*60)) % 24 );
                var days = Math.floor( t/(1000*60*60*24) );
                return {
                    'total': t,
                    'minutes': minutes,
                    'seconds': seconds
                };
            };
        }
    ]);

