angular.module('person',['ui.bootstrap'])
    .controller('PersonsCtrl', ['$scope', 'personsService', function ($scope, personsService) {
        $scope.persons = personsService.getAllPersons;
    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.person = personsService.getPerson($stateParams.id);
    }
    ])
    .controller('PersonsSliderCtrl', function($scope) {
        $scope.interval = 4000;
        $scope.slides = $scope.person.images || [];
    });
