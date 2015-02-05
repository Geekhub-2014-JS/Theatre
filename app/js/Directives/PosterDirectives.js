
angular.module('posterDirectives', [])
    .directive('thCalendar', ['apiGet', function(apiGet){
        return {
            restrict: 'E',
            templateUrl: "views/Poster/Directives/thCalendarView.html",
            scope: {
                month: "&",
                year: "&"
            },
            link: function(scope, element, attrs){


                console.log('th ' + scope.year);
                console.log('th ' + scope.month);
                //
                //apiGet('2014-11.json').success(function(data){
                //    scope.evz = data;
                //});

            }
        }
    }])
    .directive('swc', function(){
        return {
            restrict: "E",
            templateURL: "views/Poster/Directives/switchCalDateView.html",
            scope: {},
            link: function(scope, element, attrs) {
                scope.tt = "Yura";
                //scope.now = new Date();
                //scope.year = scope.now.getFullYear();
                //scope.month = (scope.now.getMonth() + 1);

                scope.year = 'year from dir';
                scope.month = 'month from dir';

                console.log(scope.year);
                console.log(scope.month);

                //scope.nextMonth = function() {
                //
                //}
            }
        }
    })
    .directive('habra', function($compile) {
        return {
            //template:"<input ng-model='hello'>{{hello}}",
            scope:false,
            restrict: "E",
            link: function ( scope,element, attrs) {
                var tmpl = '<table>'+
                    '<tr><td>d</td><td>t</td></tr>'+
                    '<tr><td>w</td><td>y</td></tr>'+
                    '</table>';

                var newElement = angular.element(tmpl);
                $compile(newElement)(scope);
                element.replaceWith(newElement);
            }
        }
    });