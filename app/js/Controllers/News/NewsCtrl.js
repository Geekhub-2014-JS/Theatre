angular.module('news',[])
    .controller('NewsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from news controller'
    }
]);