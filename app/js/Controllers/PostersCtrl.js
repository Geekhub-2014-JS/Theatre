angular.module('poster',[])
    .controller('PosterCtrl', ['$scope', 'apiGet', '$q',
    function($scope, apiGet, $q){

        //  ******   GOOD   ***********
        //var deferred = $q.defer();
        //var monthData = function () {
        //    apiGet('2014-11.json')
        //        .success(function (data) {
        //            deferred.resolve(data);
        //        })
        //        .error(function (err) {
        //            deferred.reject(err);
        //        });
        //
        //    return deferred.promise;
        //};
        //
        //monthData().then(function (data) {
        //    $scope.ok = data;  //  ok
        //}, function (error) {
        //    $scope.not_ok = error;   //  when error
        //});
        //  ******   GOOD   ***********

        //apiGet('2015-01.json').success(function(data){
        //    $scope.eve1 = data;
        //});

    }
]);