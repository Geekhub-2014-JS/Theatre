angular.module('hall', ['ngFacebook','ui.bootstrap'])

    .controller('HallCtrl', ['$scope', '$modal', '$http', 'hallService', 'cartService', 'perfomanceService', 'userService', 'apiPost', 'apiGet',
        function ($scope, $modal, $http, hallService, cartService, perfomanceService, userService, apiPost, apiGet) {
        $http.get("../backend/tickets.json").success(function (data) {
            console.log(data);
        });
            var hallConst = {
                "Черкаська Філармонія": "Filarmonia",
                "Будинок культури ім. Кулика": "Kulyka",
                "Черкаський Театр": "",
                "Кінотеатр 'Салют'": "",
                "Черкаський міський Палац молоді": "Palace_youth",
                "Центр дитячої та юнацької творчості": "",
                "Черкаський обласний художній музей":""
            };

            var selectedVenue = perfomanceService.getPerfomance().venue.title;

            for (var key in hallConst) {
                if (key === selectedVenue) selectedVenue = hallConst[key]
            }

            hallService.setHall(selectedVenue);

            $scope.getUrl = function () {
                return hallService.gethall();
            };

            $scope.addToCart = function (data) {
                $scope.busy=true;
                cartService.addPlaceToCart(data);
                $scope.$apply();
            };

            $modal.open({
                templateUrl: 'views/shared/login.html',
                windowClass: 'modal',
                controller: 'LoginCtrl'
            }).result.finally(function(){

                apiPost('customers/login',{
                    "first_name": userService.getCurrentUser().first_name,
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
    .controller('TimerCtrl', ['$scope', '$interval', 'cartService', 'timerService',
        function ($scope, $interval, cartService, timerService) {
            var timerInterval;
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
                    timerService.setCurrentTimer(endTime);
                    timerInterval=$interval(function () {
                        $scope.timer=timerService.getTime();
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

        }
    ]);

