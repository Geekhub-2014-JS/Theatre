angular.module('notDoneYetDirective', [])
    .directive('notDoneYet', function () {
        return {
            restrict: 'E',
            templateUrl: "views/shared/Directives/notDoneYet.html",
            scope: {},
            replace: true
        }
    });