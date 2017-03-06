angular.module('cart', [])
    .controller('CartCtrl', ['$scope', 'hallService', 'cartService', 'perfomanceService',
        function ($scope, hallService, cartService, perfomanceService) {
            cartService.clearCart();
            $scope.orders = cartService.getPlaceToCart();
            $scope.perfomance = perfomanceService.getPerfomance()
            $scope.deleteItem = function ($index) {
                cartService.delPlaceFromCart($index);
            }
        }
    ]);