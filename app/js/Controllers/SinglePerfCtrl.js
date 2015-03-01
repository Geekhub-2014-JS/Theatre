/**
 * Created by Yana on 16.02.2015.
 */
angular.module('singlePerf',['ui.bootstrap'])
    .controller('SinglePerformanceCtrl', ['$scope', '$q', 'apiGet', '$stateParams',
        function ($scope, $q, apiGet, $stateParams) {

            console.info($stateParams.slug);
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
    })
    .controller('PaginationCtrl', ['$scope', '$q', 'apiGet', '$stateParams',
        function ($scope, $q, apiGet, $stateParams) {
            $scope.itemPerPage = 8;
            getMembers(1);
            $scope.setPage = function (pageNo) {
                pageNo = $scope.currentPage;

                getMembers(pageNo);
            };

            $scope.maxSize = 5;

            function getMembers(pageNum) {
                apiGet($stateParams.slug + "team" + pageNum + '.json').success(function (data) {
                    $scope.teamInfo = data;
                    $scope.totalItems = data.members_count;
                });
            }
    }]);
