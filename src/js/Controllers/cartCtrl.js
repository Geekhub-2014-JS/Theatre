angular.module('cart',[])
    .controller('cartCtrl', ['$scope','hallService','cartService',
        function($scope,hallService,cartService){

            $scope.orders=cartService.getPlaceToCart();

            $scope.deleteItem=function ($index) {
                cartService.delPlaceFromCart($index);
            }
        }
    ]);