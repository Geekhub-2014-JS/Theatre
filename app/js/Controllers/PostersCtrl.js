angular.module('poster',[])
    .controller('PosterCtrl', ['$scope', '$http', 'apiGet',
    function($scope, $http, apiGet){

        $scope.rr = 'Gleb';

        apiGet('2015-01.json').success(function(data){
            $scope.eve1 = data;
        });

        $http.get('backend/2015-02.json').success(function(data){
            $scope.eve2 = data;
        })
    }
]);