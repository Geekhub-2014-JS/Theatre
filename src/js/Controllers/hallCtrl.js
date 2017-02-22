angular.module('hall',[])
    .controller('hallCtrl', ['$scope','hallService','cartService',
        function ($scope,hallService,cartService) {
           // hallService.setHall('Filarmonia');
            hallService.setHall('Kulyka');
        $scope.getUrl=function () {
            return hallService.gethall();
        };
        $scope.addToCart=function (data) {
            cartService.addPlaceToCart(data);
            $scope.$apply();
        }
    }
    ]);