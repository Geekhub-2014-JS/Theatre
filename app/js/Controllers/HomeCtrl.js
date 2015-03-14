angular.module('home',['homepage.bootstrap.carousel'])
    .controller('HomeCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            apiGet('posts.json?limit=3')
                .success(function(data, status){
                    if (status === 200) {
                        $scope.news = data.posts;
                    }
                })
                .error(function(error){
                    $scope.error = error;
                });
        }
    ])
    .controller('HomepageCarouselCtrl', ['$scope', 'apiGet', 'dateConvert',
        function($scope, apiGet, dateConvert){
            apiGet('performanceevents.json?fromDate=today&limit=5')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.slidesInfoArray = [];
                        $scope.slides = data.performance_events;
                        $scope.myInterval = 0;
                        $scope.slides.forEach(function(val, idx) {
                            $scope.slidesInfoArray[idx].date = dateConvert.perfDate(val.date_time);
                        });
                    }
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

        }
    ])
;