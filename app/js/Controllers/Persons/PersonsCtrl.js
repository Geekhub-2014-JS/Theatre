angular.module('person',[])
    .controller('PersonsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from persons controller'
    }
]);
