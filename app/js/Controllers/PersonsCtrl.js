angular.module('person', [])
    .controller('PersonsCtrl', ['$scope', 'personsService', function ($scope, personsService) {
        $scope.persons = personsService.getAllPersons;
    }
    ])
    .controller('PersonsDetailCtrl', ['$scope', 'personsService', '$stateParams', function ($scope, personsService, $stateParams) {
        $scope.person = personsService.getPerson($stateParams.id);
    }
    ])
    .controller('SliderCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        if($scope.$parent.person.images){
            $scope.images = $scope.$parent.person.images;
            $scope.slideIndex = 0;
            var imagesCnt = $scope.images.length;

            $scope.next = function () {
                if (imagesCnt > 0) {
                    $scope.slideIndex = ($scope.slideIndex == imagesCnt - 1) ? 0 : $scope.slideIndex + 1;
                }
            };
            $scope.prev = function () {
                $scope.slideIndex = ($scope.slideIndex == 0) ? $scope.imagesCnt = imagesCnt - 1 : $scope.slideIndex -1;
            };
            $scope.play = function(){
                timeOut = $timeout(function() {
                    $scope.next();
                    $scope.play();
                }, 3000);
                $scope.$play = true;
            };
            $scope.stop = function() {
                $timeout.cancel(timeOut);
                timeOut = null;
                $scope.$play = false;
            };
            $scope.play();
        }
    }]);

