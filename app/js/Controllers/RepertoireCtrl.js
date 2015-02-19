angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'repertoireService', 'apiGet',
        function($scope, repertoireService, apiGet){
            apiGet('performances.json').success(function (data) {
                $scope.repertoire = data.performances;
            });
        }
    ])
    ;