angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'repertoireService',
        function($scope, repertoireService){
            $scope.repertoire = repertoireService.getRepertoire;
        }
    ])
    .controller('SinglePerformanceCtrl', ['$scope', 'repertoireService', '$stateParams',
        function ($scope, repertoireService, $stateParams) {
            $scope.performance = repertoireService.getSinglePerformance($stateParams.performanceId);
        }
    ]);