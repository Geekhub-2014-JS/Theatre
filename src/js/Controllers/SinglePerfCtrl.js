/**
 * Created by Yana on 16.02.2015.
 */
angular.module('singlePerf',['ui.bootstrap'])
    .controller('SinglePerformanceCtrl', ['$scope', '$q', 'apiGet', '$stateParams', 'dateConvert', '$rootScope','$state','perfomanceService',
        function ($scope, $q, apiGet, $stateParams, dateConvert, $rootScope,$state,perfomanceService) {

            apiGet('performances/' + $stateParams.slug)
                .success(function (data) {
                    $scope.performance = data;
                    $scope.slides = data.gallery;
                    $rootScope.title = data.title;
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

            apiGet('performanceevents.json?fromDate=today&limit=5&performance=' + $stateParams.slug)
                .success(function (data) {
                    $scope.dates = [];
                    $scope.performanceEvents = data.performance_events;
                    $scope.performanceEvents.forEach(function(val, idx) {
                        $scope.dates[idx] = dateConvert.perfDate(val.date_time);
                    });
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

            apiGet('performances/' + $stateParams.slug + '/roles')
                .success(function (data) {
                    $scope.roles = data;
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

            $scope.selectPerfomance=function ($index) {
                perfomanceService.addPerfomance($scope.performanceEvents[$index]);
                $state.go('app.hall');
            }
        }
    ])
    .controller('PerfTabsCtrl', ['$scope', '$window',
        function ($scope, $window) {
        }
    ])
    .controller('ImageCarouselCtrl', function ($scope) {
        $scope.myInterval = 5000;

    });
