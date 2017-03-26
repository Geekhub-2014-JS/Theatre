angular.module('timerAsideDirectives', [])
    .directive('asideTimer', function () {
        return {
            restrict: 'E',
            templateUrl: "views/shared/Directives/timerAside.html",
            controller: 'TimerCtrl',
            controllerAs: 'timer'

        }
    });