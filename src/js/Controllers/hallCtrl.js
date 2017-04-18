angular.module('hall', ['ngFacebook', 'ui.bootstrap'])

    .controller('HallCtrl', ['$scope', '$modal', '$http', '$interval', 'hallService', 'cartService', 'perfomanceService', 'userService', 'ticketService', 'timerService', 'apiPost', 'apiGet',
        function ($scope, $modal, $http, $interval, hallService, cartService, perfomanceService, userService, ticketService, timerService, apiPost, apiGet) {
            var userRoute;
            var selectedVenue = perfomanceService.getPerfomance().venue.title;
            var ticketTimerInterval;

            timerService.setCurrentTimer(0);
            timerService.setCurrentTimer(0);
            cartService.clearCart();
            userService.clearUser();

            hallService.setHall(perfomanceService.getPerfomance().venue.hall_template);
            $scope.getHall = function () {
                return hallService.gethall();
            };

            $scope.addToCart = function (data) {
                $scope.busy = true;
                cartService.addPlaceToCart(data);
                $scope.$apply();
            };

            $scope.$on('$destroy', function () {
                $interval.cancel(ticketTimerInterval);
            });

            $modal.open({
                templateUrl: 'views/shared/login.html',
                windowClass: 'modal',
                controller: 'LoginCtrl'
            }).result.finally(function () {

                ticketService.clearHallSits();

                //   apiGet("perfomanseevents/"+perfomanceService.getPerfomance().id+"/tickets").success(function (data) {
                $http.get("../backend/tickets.json").success(function (data) {
                    ticketService.setTickets(data);
                    ticketService.setHallSits();
                });
                ticketTimerInterval = $interval(function () {
                    $http.get("../backend/tickets.json").success(function (data) {
                        ticketService.compareTicketChanges(data);
                    });
                }, 5000);

                if (userService.getCurrentUser().social_network) {
                    userRoute = 'customers/login/social';
                }
                else userRoute = 'customers/login/new';

                apiPost(userRoute, {
                    "first_name": userService.getCurrentUser().first_name,
                    "last_name": userService.getCurrentUser().last_name,
                    "email": userService.getCurrentUser().email,
                    "social_network": userService.getCurrentUser().network,
                    "social_token": userService.getCurrentUser().accessToken
                }).then(function (response) {
                    //do something with login in page
                }, function (response) {
                    //do something with error login in page
                });
            });
        }

    ])
    .controller('TimerCtrl', ['$scope', '$interval', 'cartService', 'timerService',
        function ($scope, $interval, cartService, timerService) {
            var timerInterval;
            var endTime;

            $scope.isCartEmpty = function () {
                $scope.startTimer();
                return cartService.getPlaceToCart().length;
            };

            $scope.timer = 0;

            $scope.stopTimer = function () {
                $interval.cancel(timerInterval)
            };

            $scope.startTimer = function () {
                if (cartService.getPlaceToCart().length && !timerInterval) {
                    endTime = new Date();
                    endTime.setMinutes(endTime.getMinutes() + 15);
                    timerService.setCurrentTimer(endTime);
                    timerInterval = $interval(function () {
                        $scope.timer = timerService.getTime();
                    }, 1000);
                } else if (!cartService.getPlaceToCart().length && timerInterval) {
                    $interval.cancel(timerInterval);
                    timerInterval = 0;
                    $scope.timer = 0;
                    timerService.setCurrentTimer();
                }
            };

            $scope.$on('$destroy', function () {
                $interval.cancel(timerInterval);
            });

        }
    ])

    .controller('TicketCtrl', ['$scope', '$interval', 'ticketService',
        function ($scope, $interval, ticketService) {
        }
    ]);

