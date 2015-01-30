angular.module('person', [])
    .controller('PersonsCtrl', ['$scope', 'personsService', function ($scope, personsService) {
        $scope.persons = personsService.getAllPersons;
    }
    ]);
