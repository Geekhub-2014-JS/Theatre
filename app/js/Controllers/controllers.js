'use strict';

/* Controllers */

var theatreControllers = angular.module('theatreControllers', []);

theatreControllers.controller('homeCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from home controller'
    }
]);

theatreControllers.controller('posterCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from poster controller'
    }
]);

theatreControllers.controller('repertoireCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from repertoire controller'
    }
]);

theatreControllers.controller('newsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from news controller'
    }
]);

theatreControllers.controller('aboutCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from about controller'
    }
]);

theatreControllers.controller('personsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from persons controller'
    }
]);

theatreControllers.controller('contactsCtrl', ['$scope',
    function($scope){
        $scope.info = 'Hello from contacts controller'
    }
]);

theatreControllers.controller('translateCtrl', ['$scope', '$translate', function($scope, $translate) {
    $scope.transl = function(lng) {
        $translate.use(lng);
    };
}]);
