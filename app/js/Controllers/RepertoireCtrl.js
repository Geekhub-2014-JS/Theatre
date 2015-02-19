angular.module('repertoire',[])
    .controller('RepertoireCtrl', ['$scope', 'apiGet',
        function($scope, apiGet){
            apiGet('performances.json').success(function (data) {
                $scope.repertoire = data.performances;
            });
        }
    ])
    ;