angular.module('about', ['angular-timeline'])
    .controller('AboutCtrl', ['$scope', 'apiGet',
        function ($scope, apiGet) {
            $scope.historyStore = [];
            $scope.busy = false;
            $scope.historyTotal = 0;
            $scope.historyPerPage = 10;
            $scope.currentPage = 0;

            $scope.loadHistory = function(){
                if ($scope.busy == true || $scope.currentPage >= $scope.pagesCount) return;
                $scope.busy = true;
                getHistory(++$scope.currentPage);
            };

            function getHistory(page) {
                apiGet("histories.json?limit=" + $scope.historyPerPage + "&page=" + page)
                    .success(function(data){
                        $scope.historyStore = $scope.historyStore.concat(data.history);
                        $scope.pagesCount = data.total_count;
                        $scope.busy = false;
                    })
                    .error(function(err){
                        console.log(err);
                    }
                );
            }
        }
    ])
    .controller('AboutDetailCtrl', ['$scope', 'apiGet', '$stateParams',
        function($scope, apiGet, $stateParams){
            $scope.title = '';
            $scope.history = {};

            getHistoryBySlug($stateParams.slug);

            function getHistoryBySlug(slug) {
                apiGet('histories/' + slug)
                    .success(function(response, status){
                        if (status === 200) {
                            $scope.history = response;
                            $scope.title = response.title;
                        }
                    })
                    .error(function(error){
                        console.log(error);
                    });
            }
        }
    ]);
