angular.module('about', [])
    .controller('AboutCtrl', ['$scope',
        function ($scope) {
            $scope.info = 'Hello from about controller'
        }
    ]);