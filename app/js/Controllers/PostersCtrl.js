angular.module('poster',[])
    .controller('PosterCtrl', ['$scope', '$http', 'apiGet', '$q',
    function($scope, $http, apiGet, $q){

        var deferred = $q.defer();
        var monthData = function () {
            apiGet('2014-11.json')
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (err) {
                    deferred.reject(err);
                });

            return deferred.promise;
        };

        monthData().then(function (data) {
            $scope.ok = data;  //  ok
        }, function (error) {
            $scope.not_ok = error;   //  when error
        });




        //
        //
        //apiGet('2015-01.json').success(function(data){
        //    $scope.eve1 = data;
        //});
        //
        //$http.get('backend/2015-02.json').success(function(data){
        //    $scope.eve2 = data;
        //})
    }
]);