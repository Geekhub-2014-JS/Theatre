angular.module('person',['ui.bootstrap'])
    .controller('PersonsCtrl', ['$scope', 'personsService','apiGet', function ($scope, personsService) {
        personsService.getAllPersons().then(function(data){
            $scope.persons = data.employees;
            console.log($scope.persons);
        });
    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.promise = personsService.getPerson($stateParams.id).then(function(data){
            $scope.person = data;
            return data;
        });
    }
    ])
    .controller('PersonsSliderCtrl', function($scope) {
        $scope.interval = 4000;
        $scope.promise.then(function(data){
           $scope.slides = data.images;
        });
    });
