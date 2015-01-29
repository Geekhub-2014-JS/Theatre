'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    .constant('api_url', 'http://api.theatre.pp.ua/')
    .factory('apiPost', ['$http', 'api_url',
        function($http, api_url){
            return function(url, data) {
                return $http.post(api_url + url, data)
                    .success(function(response){
                        return response.data || [];
// TODO: нужно оттестить, возможно нужно так: return response || [];
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
                        return response.data || [];
// TODO: нужно оттестить, возможно нужно так: return response || [];
                    })
                    .error(function(error){
                        return error;
                    })
                    ;
            }
        }
    ]);
