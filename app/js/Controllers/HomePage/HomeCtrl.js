angular.module('home',[])
    .controller('HomeCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from home controller'
    }
]);