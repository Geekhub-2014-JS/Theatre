angular.module('searchDirective', [])
    .directive('searchBlock', function () {
        return {
            restrict: 'E',
            templateUrl: "views/shared/Directives/searchBlock.html",
            scope: {},
            replace: true
        }
    });