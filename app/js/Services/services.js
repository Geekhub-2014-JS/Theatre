'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    .constant('api_url', 'http://api.theatre.pp.ua/')
    //.constant('api_url', '/backend/')

    .factory('apiPost', ['$http', 'api_url', '$stateParams',
        function ($http, api_url, $stateParams) {
            return function (url, data) {
                var conf = {
                    method: 'GET',
                    url: api_url + url,
                    headers: {
                        'locale': $stateParams.locale
                    },
                    data: data
                };

                //return $http(conf)
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
    .factory('apiGet', ['$http', 'api_url', '$stateParams',
        function ($http, api_url, $stateParams) {
            return function (url) {
                var conf = {
                    method: 'GET',
                    url: api_url + url,
                    headers: {
                        'locale': $stateParams.locale
                    }
                };

                //return $http(conf)
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
            getAllPersons: function (page,limit) {
                var deferred = $q.defer();
                apiGet('employees?limit=' + limit + '&page=' + page)
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
                apiGet('employees/' + id)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (data, status) {
                        deferred.reject(status);
                    });
                return deferred.promise;
            }
        };
    }])

    .factory('dateConvert', function() {
        return {
            perfDate: function(timestamp) {
                var currentDate = moment(timestamp);
                var weekDay = ["weekDay.Sunday", "weekDay.Monday", "weekDay.Tuesday", "weekDay.Wednesday", "weekDay.Thursday", "weekDay.Friday", "weekDay.Saturday"];
                var monthN = ["month.Jan", "month.Feb", "month.Mar", "month.Apr", "month.May", "month.Jun", "month.Jul", "month.Aug", "month.Sept", "month.Oct", "month.Nov", "month.Dec"];
                return {
                    weekDay: weekDay[currentDate.format("d")],
                    day: currentDate.format("D"),
                    month: monthN[currentDate.format("M")-1],
                    time: currentDate.format("H:mm")
                };
            }
        }
    })
;
