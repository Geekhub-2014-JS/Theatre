angular.module('home',['homepage.bootstrap.carousel'])
    .controller('HomeCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            apiGet('posts.json?limit=5')
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
    .controller('HomepageCarouselCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            apiGet('performanceevents.json?fromDate=today&limit=5')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.slides = data.performance_events;
                        $scope.myInterval = 0;
                    }
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

        }
    ])
;