angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            $scope.itemPerPage = 100;
            getPerformances(1);
            $scope.setPage = function (pageNo) {
                pageNo = $scope.currentPage;
                getPerformances(pageNo);
            };

            $scope.maxSize = 5;

            function getPerformances(pageNum) {
                apiGet('performances' + '?limit=' + $scope.itemPerPage + '&page=' + pageNum)
                    .success(function (data) {
                        $scope.repertoire = data.performances;
                        $scope.totalItems = data.total_count;
                    })
                    .error(function(error) {
                        $scope.error = error;
                    })
                ;
            }
        }
    ])
    ;