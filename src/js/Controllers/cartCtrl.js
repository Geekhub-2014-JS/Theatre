angular.module('cart', [])
    .controller('CartCtrl', ['$scope', '$interval', 'hallService', 'cartService', 'userService', 'perfomanceService', 'timerService', 'dateConvert',
        function ($scope, $interval, hallService, cartService, userService, perfomanceService, timerService, dateConvert) {
            $scope.timer=0;
            $scope.orders = cartService.getPlaceToCart();
            $scope.perfomance = perfomanceService.getPerfomance();
            $scope.perfomanceDate=dateConvert.perfDate($scope.perfomance.date_time);
            $scope.deleteItem = function ($index) {
                cartService.delPlaceFromCart($index);
            };
            $scope.customer=userService.getCurrentUser();
            $scope.total=function () {
                var total=0;
                for (var i=0;i<$scope.orders.length;i++){
                    total+=+$scope.orders[i].cost;
                }
                return total;
            };
        }
    ]);