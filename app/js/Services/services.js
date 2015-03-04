'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
<<<<<<< Updated upstream
    .constant('api_url', '/backend/')
    .factory('apiPost', ['$http', 'api_url',
        function ($http, api_url) {
=======
    .constant('api_url', 'http://api.theatre.pp.ua/')
    //.constant('api_url', '/backend/')

    .factory('apiPost', ['$http', 'api_url', '$stateParams',
        function ($http, api_url, $stateParams) {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        }
    ]);
=======
        };
    }])

    .factory('dateConvert', function() {
        return {
            perfDate: function(timestamp) {
                var currentDate = moment(timestamp); // TODO add locale('')
                var weekDay = ["month.Jan", "month.Feb", "month.Mar", "month.Apr", "month.May", "month.Jun", "month.Jul", "month.Aug", "month.Sept", "month.Oct", "month.Nov", "month.Dec"];
                var monthN = ["month.Jan", "month.Feb", "month.Mar", "month.Apr", "month.May", "month.Jun", "month.Jul", "month.Aug", "month.Sept", "month.Oct", "month.Nov", "month.Dec"];
                return {
                    weekDay: weekDay[currentDate.format("d")],
                    day: currentDate.format("D"),
                    month: monthN[currentDate.format("M")+1],
                    time: currentDate.format("H:mm")
                };
            }
        }
    })
;
>>>>>>> Stashed changes
