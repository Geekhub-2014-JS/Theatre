angular.module('titleDirective', [])
    .directive('pageTitle', ['$rootScope', '$timeout',
    function($rootScope) {
        return {
            link: function() {

                var listener = function(event, toState) {
                        $rootScope.title = (toState.data && toState.data.pageTitle) ? toState.data.pageTitle : 'Theatre';
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
]);