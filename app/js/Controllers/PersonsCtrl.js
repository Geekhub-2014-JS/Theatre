angular.module('person', ['ui.bootstrap'])
    .controller('PersonsCtrl', ['$scope', 'personsService', 'apiGet', function ($scope, personsService) {
        $scope.persons = [];
        $scope.personsTotal = 0;
        $scope.peronsPerPage = 6; //pagination limit per page
        $scope.currentPage = 1;
        $scope.busy = false;

        $scope.loadPersons = function () {
            if ($scope.busy == true || $scope.currentPage >= $scope.pagesCount) return;
            $scope.busy = true;
            getResultsPage($scope.currentPage++);
        };

        function getResultsPage(pageNumber) {
            personsService.getAllPersons(pageNumber, $scope.peronsPerPage)
                .then(function (data) {
                    $scope.persons = $scope.persons.concat(data.employees);

                    $scope.pagesCount = data.page_count;
                    $scope.busy = false;
                });
        }

    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.promise = personsService.getPerson($stateParams.id).then(function (data) {
            $scope.person = data;
            return data;
        });
    }
    ])
    .controller('PersonsSliderCtrl', function ($scope) {
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
