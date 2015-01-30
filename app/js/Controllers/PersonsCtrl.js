angular.module('person', [])
    .controller('PersonsCtrl', ['$scope', 'personsService', function ($scope, personsService) {
        $scope.persons = personsService.getAllPersons;
    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.person = personsService.getPerson($stateParams.id);
    }
    ]);

