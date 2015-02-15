angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'repertoireService', 'apiGet',
        function($scope, repertoireService, apiGet){
            apiGet('performances.json').success(function (data) {
                $scope.repertoire = data.performances;
            });
        }
    ])
    .controller('SinglePerformanceCtrl', ['$scope', '$http', 'apiGet', '$stateParams',
        function ($scope, $http, apiGet, $stateParams) {
            apiGet($stateParams.slug + '.json').success(function (data) {
                $scope.performance = data;
            });
        }
    ]);