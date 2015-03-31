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
    });
