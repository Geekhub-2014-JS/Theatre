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
                    })
                    ;
            }
        }
    ])


    .factory('personsService', ['$http', 'apiGet', function ($http, apiGet) {
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
                var person;
                persons.forEach(function(pers){
                    if(pers.id == id){person = pers; return false;}
                });
                return person;
            }
        };
    }]);