angular.module('hall', ['ngFacebook','ui.bootstrap'])

    .controller('HallCtrl', ['$scope', '$modal', 'hallService', 'cartService', 'perfomanceService',
        function ($scope, $modal, hallService, cartService, perfomanceService) {
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
            }

            $modal.open({
                templateUrl: 'views/shared/login.html',
                backdrop: true,
                windowClass: 'modal',
                controller: 'LoginCtrl'
            });
        }

    ]);