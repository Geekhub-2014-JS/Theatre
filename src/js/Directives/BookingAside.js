angular.module('cartAsideDirectives', [])
    .directive('asideCart', function () {
        return {
            restrict: 'E',
            templateUrl: "views/shared/Directives/bookingAside.html",
            controller: 'CartCtrl',
            controllerAs: 'cart'

        }
    });