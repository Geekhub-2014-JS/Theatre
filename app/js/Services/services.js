'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    .constant('api_url', '/backend/')
    .factory('apiPost', ['$http', 'api_url',
        function ($http, api_url) {
            return function (url, data) {
                return $http.post(api_url + url, data)
                    .success(function (response) {
                        return response || [];
                    })
                    .error(function (error) {
                        return error;
                    })
                ;
            }
        }
    ])
    .factory('apiGet', ['$http', 'api_url',
        function ($http, api_url) {
            return function (url) {
                return $http.get(api_url + url)
                    .success(function (response) {
                        return response || [];
                    })
                    .error(function (error) {
                        return error;
                    });
            }
        }
    ])


    .factory('personsService', ['$http', 'apiGet', '$q', function ($http, apiGet, $q) {
        return {
            getAllPersons: function () {
                var deferred = $q.defer();
                apiGet('/persons/all.json')
                    .success(function (data) {
                    deferred.resolve(data);
                })
                    .error(function (data, status) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            },
            getPerson: function(id){
                var deferred = $q.defer();
                apiGet('/persons/' + id + '.json')
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            }
        };
    }]);
