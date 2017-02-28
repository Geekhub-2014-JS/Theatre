angular.module('hall', [])
    .controller('hallCtrl', ['$scope', 'hallService', 'cartService', 'perfomanceService',
        function ($scope, hallService, cartService, perfomanceService) {
            var hallConst = {
                "Черкаська Філармонія": "Filarmonia",
                "Будинок культури ім. Кулика": "Kulyka",
                "Черкаський Театр": "",
                "Кінотеатр 'Салют'": "",
                "Черкаський міський Палац молоді": "",
                "Центр дитячої та юнацької творчості": ""
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
        }
    ]);