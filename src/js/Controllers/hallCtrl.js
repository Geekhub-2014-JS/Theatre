angular.module('hall', ['ngFacebook', 'ui.bootstrap'])

    .controller('HallCtrl', ['$scope', '$modal', '$http', '$interval', 'hallService', 'cartService', 'perfomanceService', 'userService', 'ticketService', 'timerService', 'apiPost', 'apiGet', '$compile', '$loading',
        function ($scope, $modal, $http, $interval, hallService, cartService, perfomanceService, userService, ticketService, timerService, apiPost, apiGet, $compile, $loading) {
            var userRoute;
            var ticketTimerInterval;
            var legendDL;
            $scope.perfomance = perfomanceService.getPerfomance();


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

            apiGet("users/me").success(function (response) {
                userService.addUser(response.user);
            }).error(function () {
                apiPost('users/register').then(function (response) {
                    userService.setApiKeyToken(response.data.api_key);
                });

                $modal.open({
                    templateUrl: 'views/shared/Login.html',
                    windowClass: 'modal',
                    controller: 'LoginCtrl'
                }).result.finally(function () {
                    apiPost('users/login/social', JSON.stringify({
                        "social_network": userService.getCurrentUser().network,
                        "social_token": userService.getCurrentUser().accessToken
                    })).then(function (response) {
                        userService.addUser(response.data.user);
                    }, function (error) {
                        console.error(error.status, error.statusText, "Unauthorized");
                    });
                });
            });

            //  ToDo apiGet("perfomanseevents/"+perfomanceService.getPerfomance().id+"/tickets").success(function (data) {

            apiGet("performanceevents/"+ $scope.perfomance.id + "/tickets").success(function (data) {
                apiGet("performanceevents/" + $scope.perfomance.id + "/pricecategories").success(function (dataLegend) {
                    ticketService.setLegend(dataLegend);
                    legendDL = document.getElementsByClassName('legend')[0];
                    dataLegend.forEach(function (element) {
                        var newDt = document.createElement('Dt');
                        var newDd = document.createElement('Dd');
                        newDt.style.backgroundColor = element.color;
                        newDd.innerHTML = " " + element.price + " {{'booking.uah' | translate}}";
                        $compile(newDd)($scope);
                        legendDL.appendChild(newDt);
                        legendDL.appendChild(newDd);
                    });
                    ticketService.clearHallSits();
                    ticketService.setTickets(data);
                    ticketService.setHallSits();
                    setSitsPopover();
                });
            });
            ticketTimerInterval = $interval(function () {
                apiGet("performanceevents/" + $scope.perfomance.id + "/tickets",true).success(function (data) {
                    ticketService.compareTicketChanges(data);
                });
            }, 5000);
        }

    ])
    .controller('TimerCtrl', ['$scope', '$interval', 'cartService', 'perfomanceService', 'timerService', '$state', '$stateParams', '$modal',
        function ($scope, $interval, cartService, perfomanceService, timerService, $state, $stateParams, $modal) {
            var timerInterval;
            var endTime;
            var timeForBuy=15;

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
                    endTime.setMinutes(endTime.getMinutes() + timeForBuy);
                    timerService.setCurrentTimer(endTime);
                    timerInterval = $interval(function () {
                        $scope.timer = timerService.getTime();
                        if ($scope.timer.total<0) {
                            $interval.cancel(timerInterval);
                            $state.go('app.home');
                            $modal.open({
                                templateUrl: 'views/shared/submit.html',
                                windowClass: 'modal'
                            });
                        }
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

