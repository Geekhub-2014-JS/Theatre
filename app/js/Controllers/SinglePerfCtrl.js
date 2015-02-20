/**
 * Created by Yana on 16.02.2015.
 */
angular.module('singlePerf',['ui.bootstrap'])
    .controller('SinglePerformanceCtrl', ['$scope', '$q', 'apiGet', '$stateParams',
        function ($scope, $q, apiGet, $stateParams) {
            apiGet($stateParams.slug + '.json').success(function (data) {
                $scope.performance = data;
            });
        }
    ])
    .controller('PerfTabsCtrl', ['$scope', '$window',
        function ($scope, $window) {

        }
    ])
    .controller('ImageCarouselCtrl', function ($scope) {
        $scope.myInterval = 5000;
    });