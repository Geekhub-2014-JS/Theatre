angular.module('about', ['angular-timeline'])
    .controller('AboutCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.historyStore = [];

            $scope.getHistory = function(year){
                $http.get("/backend/about/" + year + ".json")
                    .success(function(data){
                        $scope.historyStore = data;
                    })
                        .error(function(err){
                        console.log(err);
                    }
                )
            };
            $scope.getHistory(2010);
        }
    ])
;