angular.module('contacts',[])
    .controller('ContactsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from contacts controller'
    }
]);
