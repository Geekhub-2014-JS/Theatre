angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            $scope.totalItems = 140;
            $scope.itemPerPage = 8;
            getPerformances(1);
            $scope.setPage = function (pageNo) {
                pageNo = $scope.currentPage;

                getPerformances(pageNo);
            };

            $scope.maxSize = 5;

            function getPerformances(pageNum) {
                apiGet('performances.json').success(function (data) {
                    $scope.repertoire = data;
                });
                //apiGet($stateParams.slug + "team" + pageNum + '.json').success(function (data) {
                //    $scope.teamInfo = data;
                //    $scope.totalItems = data.members_count;
                //});
            }
        }
    ])
    ;