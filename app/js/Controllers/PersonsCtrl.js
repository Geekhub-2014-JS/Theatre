angular.module('person',['ui.bootstrap'])
    .controller('PersonsCtrl', ['$scope', 'personsService','apiGet', function ($scope, personsService) {
        $scope.persons = [];
        $scope.personsUsers = 0;
        $scope.peronsPerPage = 24; //pagination limit per page
        getResultsPage(1);

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            personsService.getAllPersons(pageNumber,$scope.peronsPerPage)
                .then(function(data) {
                    $scope.persons = data.employees;
                    //temp
                    $scope.personsUsers = data.page_count * 25;
                    //$scope.personsUsers = data.total_persons;
                });
        }

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
        //temp
        $scope.slides = [
            {
                "image": "http://lorempixel.com/1000/400",
                "text": "sometext"
            },
            {
                "image": "http://lorempixel.com/1001/400",
                "text": "sometext"
            },
            {
                "image": "http://lorempixel.com/1000/401",
                "text": "sometext"
            },
            {
                "image": "http://lorempixel.com/1001/401",
                "text": "sometext"
            }
        ];
        //$scope.promise.then(function(data){
        //   $scope.slides = data.images;
        //});
    });
