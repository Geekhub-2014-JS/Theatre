angular.module('home',[])
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
    .controller('HomepageCarousel', ['$scope', 'apiGet', 'dateConvert',
        function($scope, apiGet, dateConvert){
            $scope.slidesInfoArray = [];
            apiGet('performanceevents.json?fromDate=today&limit=5')
                .success(function (data, status) {
                    if (status === 200) {
                        $scope.slides = data.performance_events;
                        $scope.slidesDate = dateConvert.perfDate;
                        selectActiveSlide(0);
                        $scope.selectSlide = selectActiveSlide;
                    }
                })
                .error(function(error) {
                    $scope.error = error;
                })
            ;

            function selectActiveSlide(index) {
                $scope.activeSlideIndex = index;
            }
        }
    ])
;