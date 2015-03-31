angular.module('sideMenuDirective', [])
    .directive('asideMenu', function () {
        return {
            restrict: 'E',
            templateUrl: "views/shared/Directives/asideMenu.html",
            scope: {},
            replace: true
        }
    });