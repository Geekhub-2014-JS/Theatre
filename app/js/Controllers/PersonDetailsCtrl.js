angular.module('persons.detailCtrl', [])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.person = personsService.getPerson($stateParams.id);
    }
    ]);
