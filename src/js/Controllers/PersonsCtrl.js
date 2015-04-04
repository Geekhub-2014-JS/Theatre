angular.module('person', ['ui.bootstrap'])
    .controller('PersonsCtrl', ['$scope', 'personsService', 'apiGet', function ($scope, personsService) {
        $scope.persons = [];
        $scope.personsTotal = 0;
        $scope.peronsPerPage = 36; //pagination limit per page
        $scope.currentPage = 0;
        $scope.busy = false;

        $scope.loadPersons = function () {
            if ($scope.busy == true || $scope.currentPage >= $scope.pagesCount) return;
            $scope.busy = true;
            getResultsPage(++$scope.currentPage);
        };

        function getResultsPage(pageNumber) {
            personsService.getAllPersons(pageNumber, $scope.peronsPerPage)
                .then(function (data) {
                    $scope.persons = $scope.persons.concat(data.employees);
                    $scope.pagesCount = Math.ceil(data.total_count / $scope.peronsPerPage);
                    $scope.busy = false;
                });
        }

    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', 'apiGet', 'Lightbox', function ($scope, personsService, $stateParams, apiGet, Lightbox) {
        $scope.roles = [];
        $scope.promise = personsService.getPerson($stateParams.id).then(function (data) {
            $scope.person = data;
            return data;
        });
        apiGet('employees/' + $stateParams.id + '/roles.json').then(function (response){
           $scope.roles = response.data;
        });

        $scope.openLightboxModal = function(index){
            Lightbox.openModal($scope.person.gallery, index);
        };
    }
    ]);