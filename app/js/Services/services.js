'use strict';

/* Services */

//var theatreServices = angular.module('theatreServices', []);
//
//theatreServices
//    .constant('api_url', 'backend/')
//    //.constant('api_url', 'http://api.theatre.pp.ua/')
//    .factory('apiPost', ['$http', 'api_url',
//        function($http, api_url){
//            return function(url, data) {
//                return $http.post(api_url + url, data)
//                    .success(function(response){
//                        return response || [];
//// TODO: нужно оттестить, возможно нужно так: return response || [];
//                    })
//                    .error(function(error){
//                        return error;
//                    })
//                    ;
//            }
//        }
//    ])
//   .factory('apiGet', ['$http', 'api_url',
//        function($http, api_url) {
//            return function(url) {
//                return $http.get(api_url + url)
//                    .success(function(response) {
//                        return response || [];
//// TODO: нужно оттестить, возможно нужно так: return response || [];
//                    })
//                    .error(function(error){
//                        return error;
//                    })
//                    ;
//            }
//        }
//    ]);
//
//

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
                        return response.data || [];
                    })
                    .error(function (error) {
                        return error;
                    })
                    ;
            }
        }
    ])
    .factory('posters', ['apiGet', function(gett){
        var posters = [];
        gett('2015-01.json').then(function(response){
            posters = response.data || [];

            return response;
        });

        return {
            all: function() {
                return posters;
            }
        }

    }])
    .factory('personsService', ['apiGet', function (apiGet) {
        var persons = [];
        apiGet('persons.json').then(function (response) {
            persons = response.data || [];
            return response;
        });

        return {
            getAllPersons: function () {
                return persons;
            },
            getPerson: function(id){
                return persons[id];
            }
        };
    }]);