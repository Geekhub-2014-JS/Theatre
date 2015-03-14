angular.module('news',[])
    .controller('NewsCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            $scope.news = [];
            $scope.posters = [];
            $scope.perPage = 4;
            $scope.total = 0;
            $scope.nextPage = function (page) {
                getNews(page);
            };

            getNews(1);

            var now = moment();
            var toDate = now.add(4, 'days');
            var url = 'performanceevents.json?fromDate=today&toDate=' + toDate.format('DD-MM-YYYY') + '&limit=4';
            apiGet(url)
                .success(function(response, status){
                    if (status === 200) {
                        $scope.posters = response.performance_events;
                    }
                })
                .error(function(error){
                    console.log(error);
                });

            function getNews(page) {
                apiGet('posts.json?limit=' + $scope.perPage + '&page=' + page)
                    .success(function(response, status){
                        if (status === 200) {
                            $scope.news = response.posts;
                            $scope.total = response.page_count * $scope.perPage;
                        }
                    })
                    .error(function(error){
                        console.log(error);
                    });
            }
        }
    ])
    .controller('NewsDetailCtrl', ['$scope', 'apiGet', '$stateParams',
        function($scope, apiGet, $stateParams){
            $scope.title = '';
            $scope.news = {};

            getNewsBySlug($stateParams.id);

            function getNewsBySlug(slug) {
                apiGet('posts/' + slug)
                    .success(function(response, status){
                        if (status === 200) {
                            $scope.news = response;
                            $scope.title = response.title;
                        }
                    })
                    .error(function(error){
                        console.log(error);
                    });
            }
        }
    ]);