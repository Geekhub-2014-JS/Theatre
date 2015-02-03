
angular.module('posterDirectives', [])
    .directive('thCalendar', ['apiGet', function(apiGet){
        return {
            restrict: 'E',
            templateUrl: "views/Persons/Directives/thCalendar.html",
            scope: {
                events: "="
            },
            link: function(scope, element, attrs){

                //apiGet('2014-11.json').success(function(data){
                //    scope.evz = data;
                //});

            }
        }
    }]);