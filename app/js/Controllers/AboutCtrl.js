angular.module('about', ['angular-timeline'])
    .controller('AboutCtrl', ['$scope', '$http',
        function ($scope, $http) {
            $scope.historyStore = [];
            $scope.busy = false;
            $scope.minDecade = 1980;
            $scope.currentDecade = 2010;

            $scope.getHistory = function(year){
                $http.get("/backend/about/" + year + ".json")
                    .success(function(data){
                        $scope.historyStore = $scope.historyStore.concat(data);
                    })
                        .error(function(err){
                        console.log(err);
                    }
                )
            };

            $scope.loadHistory = function () {
                if ($scope.busy == true || $scope.currentDecade <= $scope.minDecade) return;
                $scope.busy = true;
                $scope.getHistory($scope.currentDecade);
                $scope.currentDecade -= 10;
                $scope.busy = false;
            };
        }
    ]);