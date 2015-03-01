/**
 * Created by Yana on 16.02.2015.
 */
angular.module('singlePerf',['ui.bootstrap'])
    .controller('SinglePerformanceCtrl', ['$scope', '$q', 'apiGet', '$stateParams', 'dateConvert',
        function ($scope, $q, apiGet, $stateParams, dateConvert) {

            apiGet('performances/' + $stateParams.slug)
                .success(function (data) {
                    $scope.performance = data;
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

            apiGet('performances/' + $stateParams.slug + '/performanceevents') // TODO to much information for a few dates
                .success(function (data) {
                    $scope.dates = [];
                    $scope.performanceEvents = data;
                    $scope.performanceEvents.forEach(function(val, idx) {
                        $scope.dates[idx] = dateConvert.perfDate(val.date_time);
                    });
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;
        }
    ])
    .controller('PerfTabsCtrl', ['$scope', '$window',
        function ($scope, $window) {
        }
    ])
    .controller('ImageCarouselCtrl', function ($scope) {
        $scope.myInterval = 5000;

        var slides = $scope.slides = [];
        $scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                source: 'http://placekitten.com/' + newWidth + '/300',
                text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
                ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i=0; i<10; i++) {
            $scope.addSlide();
        }
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
                apiGet('performances/' + $stateParams.slug + '/roles') // TODO (+ '?limit=' + $scope.itemPerPage + '&page=' + 'pageNum')
                    .success(function (data) {
                        $scope.roles = data;
                        //$scope.totalItems = data.members_count;
                    })
                    .error(function(error) {
                        $scope.error = error;
                    })
                ;
            }
    }]);
