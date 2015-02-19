/**
 * Created by Yana on 16.02.2015.
 */
angular.module('singlePerf',['ui.bootstrap'])
    .controller('SinglePerformanceCtrl', ['$scope', '$http', 'apiGet', '$stateParams',
        function ($scope, $http, apiGet, $stateParams) {
            apiGet($stateParams.slug + '.json').success(function (data) {
                $scope.performance = data;
            });
        }
    ])
    .controller('PerfTabsCtrl', ['$scope', '$window',
        function ($scope, $window) {

        }
    ]);