'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    .constant('api_url', 'http://api.theatre.pp.ua/')
    //.constant('api_url', 'http://apistaging.theatre.pp.ua/')
    .factory('apiPost', ['$http', 'api_url', '$stateParams',
        function ($http, api_url, $stateParams) {
            return function (url, data) {
                var conf = {
                    method: 'POST',
                    url: api_url + url,
                    headers: {
                        'locale': $stateParams.locale
                    },
                    data: data
                };

                return $http(conf)
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
    .factory('apiGet', ['$http', 'api_url', '$stateParams', '$loading',
        function ($http, api_url, $stateParams, $loading) {
            return function (url) {
                var conf = {
                    method: 'GET',
                    url: api_url + url,
                    params: {
                        'locale': $stateParams.locale
                    }
                    //headers: {
                    //    'locale': $stateParams.locale
                    //}
                };
                $loading.start('spiner');
                return $http(conf)
                    .success(function (response) {
                        $loading.finish('spiner');
                        return response || [];
                    })
                    .error(function (error) {
                        $loading.finish('spiner');
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
                var monthN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                return {
                    weekDay: weekDay[currentDate.format("d")],
                    day: currentDate.format("D"),
                    month: monthN[currentDate.format("M")-1],
                    time: currentDate.format("H:mm")
                };
            }
        }
    })

    .factory('hallService', function() {
        var hall='';
        return {
            gethall:function () {
                return "/views/Hall/"+hall+".html";
            },
            setHall:function (newHall) {
                hall=newHall;
            }
        }
    })

.factory('cartService', function () {
    var order = [];
    return {
        addPlaceToCart: function (orders) {
            orders = orders.split(',');
            order.push({
                row: orders[1],
                sit: orders[2],
                cost: 0,
                area: orders[0]
            });
        },
        getPlaceToCart: function () {
            return order;
        },
        delPlaceFromCart: function (index) {
            order.splice(index, 1);
        }
    }

})
;
