'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    //.constant('api_url', 'http://api.theatre.pp.ua/')
    .constant('api_url', '/backend/')
    .factory('apiPost', ['$http', 'api_url',
        function($http, api_url){
            return function(url, data) {
                return $http.post(api_url + url, data)
                    .success(function(response){
                        return response || [];
                    })
                    .error(function(error){
                        return error;
                    })
                    ;
            }
        }
    ])
    .factory('apiGet', ['$http', 'api_url',
        function($http, api_url) {
            return function(url) {
                return $http.get(api_url + url)
                    .success(function(response) {
                        return response || [];
                    })
                    .error(function(error){
                        return error;
                    })
                    ;
            }
        }
    ])

    .factory('repertoireService', ['$http', 'apiGet', function ($http, apiGet) {
        var factory = {

        };
        return factory;
        }
    ])

    .factory('singlePerformanceService', ['$http', 'apiGet',
        function($http, apiGet) {
            var factory = {

            };
            return factory;
        }
    ])
;

