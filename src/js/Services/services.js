'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);
//var api_token='';
theatreServices
    .constant('api_url', 'https://api.staging.theatre.pp.ua/')

    .factory('apiPost', ['$http', 'api_url', '$stateParams', 'userService',
        function ($http, api_url, $stateParams, userService) {
            return function (url, data) {
                var conf = {
                    method: 'POST',
                    url: api_url + url,
                    headers: {
                        'locale': $stateParams.locale,
                        'API-Key-Token': userService.getApiToken() || ''
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
    .factory('apiGet', ['$http', 'api_url', '$stateParams', '$loading', 'userService',
        function ($http, api_url, $stateParams, $loading, userService) {
            return function (url,disableSpinner) {
                var conf = {
                    method: 'GET',
                    url: api_url + url,
                    params: {
                        'locale': $stateParams.locale
                    },
                    headers: {
                        'API-Key-Token': userService.getApiToken() || ''
                    }
                };
              if (!disableSpinner) $loading.start('spiner');
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
            getAllPersons: function (page, limit) {
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
            getPerson: function (id) {
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

    .factory('dateConvert', function () {
        return {
            perfDate: function (timestamp) {
                var currentDate = moment(timestamp);
                var weekDay = ["weekDay.Sunday", "weekDay.Monday", "weekDay.Tuesday", "weekDay.Wednesday", "weekDay.Thursday", "weekDay.Friday", "weekDay.Saturday"];
                var monthN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                return {
                    weekDay: weekDay[currentDate.format("d")],
                    day: currentDate.format("D"),
                    month: monthN[currentDate.format("M") - 1],
                    time: currentDate.format("H:mm")
                };
            }
        }
    })

    .factory('hallService', function ($sce) {
        var hall = '';
        return {
            gethall: function () {
                return $sce.trustAsHtml(hall);
            },
            setHall: function (newHall) {
                hall = newHall;
            }
        }
    })

    .factory('cartService', ['apiGet', 'ticketService', 'perfomanceService', function (apiGet,ticketService,perfomanceService) {
        var order = [];
        var totalSum = 0;
        return {
            addPlaceToCart: function (orders) {
                order.push({
                    row: orders.row,
                    sit: orders.sit,
                    cost: orders.cost,
                    section: orders.section
                });
                totalSum += +orders.cost;
            },
            getPlaceToCart: function () {
                return order;
            },
            delPlaceFromCart: function (index) {
                totalSum -= +order[index].cost;
                order.splice(index, 1);

            },
            clearCart: function () {
                order.splice(0, order.length);
                totalSum = 0;
                //todo api PATCH /tickets/{id}/free
                apiGet("performanceevents/" + perfomanceService.getPerfomance().id + "/tickets",true).success(function (data) {
                    ticketService.setTickets(data);
                    ticketService.compareTicketChanges(data);
                });
            }
        }

    }])

    .factory('perfomanceService', function () {
        var selectedPerfomance = {};
        return {
            addPerfomance: function (performanse) {
                selectedPerfomance = {};
                selectedPerfomance = performanse;
            },
            getPerfomance: function () {
                return selectedPerfomance;
            }
        }

    })

    .factory('userService', [function () {
        var currentUser = {};
        var customer = {};
        var apiKey = "";
        return {
            addUser: function (user) {
                currentUser = user;
            },
            getCurrentUser: function () {
                return currentUser;
            },
            setNetwork: function (network) {
                currentUser.network = network;
            },
            setApiToken: function (accessToken) {
                currentUser.accessToken = accessToken;
            },
            setApiKeyToken: function (accessToken) {
                apiKey = accessToken;
            },
            clearUser: function () {
                currentUser = {};
            },
            getApiToken: function () {
                return apiKey;
            }
        }
    }])

    .factory('timerService', function () {
        var timer;
        return {
            getTime: function getTimeRemaining() {
                var t = Date.parse(timer) - Date.parse(new Date());
                var seconds = Math.floor((t / 1000) % 60);
                var minutes = Math.floor((t / 1000 / 60) % 60);
                var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                var days = Math.floor(t / (1000 * 60 * 60 * 24));
                return {
                    'total': t,
                    'minutes': minutes,
                    'seconds': ('0' + parseInt(seconds)).slice(-2) //seconds
                };
            },
            setCurrentTimer: function (newTimer) {
                if (!newTimer) timer = 0;
                if (!timer) timer = newTimer;

            },
            getCurrentTimer: function () {
                return timer;
            }
        }
    })

    .factory('ticketService', ['$document',
        function () {
            var currectTicketSet;
            var activeTicketSet = [];
            var legend=[];

            function setSit(selectPlace, element, color) {
                selectPlace.setAttribute('ticket-uuid', element.id);
                if (element.status !== "offline") {
                    selectPlace.className = '';
                    selectPlace.className += 'place ';
                    element.className += 'place-'+element.status;
                    selectPlace.setAttribute('data-price', element.price);
                    selectPlace.setAttribute('ticket-perfomance-id', element.performance_event_id);
                    selectPlace.setAttribute('ticket-series-number', element.series_number);
                    selectPlace.setAttribute('ticket-uuid', element.id);

                    if (element.status == 'free') {
                        selectPlace.style.backgroundColor = color;
                    } else if (element.status == 'bought') {
                        selectPlace.style.backgroundColor = '#a9a9a9'; //Todo check if reserved
                    } else {
                        selectPlace.style.backgroundColor = '#d3d3d3';
                    };
                }
            };

            function findSitInDOM(venue, row, place) {
                var selectPlace = document.querySelector('.' + venue);
                if(!selectPlace) {
                    selectPlace=document.querySelector('[data-section="' + venue + '"]');
                }
                if (selectPlace) {
                    selectPlace.querySelectorAll('[data-row="' + row + '"]').forEach(function (element) {
                        if (element.querySelector('[data-place="' + place + '"]')) {
                            selectPlace = element.querySelector('[data-place="' + place + '"]');
                        }
                    });
                }
                if (selectPlace && selectPlace.tagName === 'UL') {
                    selectPlace = selectPlace.querySelector('[data-place="' + place + '"]');
                }
                return selectPlace;
            };

            function formatOnlineSits(ticketsArray) {
                var activeTicketsArray=[];

                ticketsArray.forEach(function (element) {

                    if (element.status !== "offline") {
                        activeTicketsArray.push(element)
                    };
                });
                activeTicketsArray.forEach(function (element) {

                    for (var i = 0; i < legend.length; i++) {
                        var sits=legend[i].rows.split('-');

                        if (legend[i].venueSector_id.id == element.seat.venue_sector_id) {
                            element.venue_sector = legend[i].venueSector_id.slug;
                            var elem=$(findSitInDOM(element.venue_sector,element.seat.row,element.seat.place)).parents("*[data-row]").attr("data-row");

                            if (elem>=parseInt(sits[0])&&elem<=parseInt(sits[1])) {
                                element.color = legend[i].color;
                                break;
                            };
                        }
                    }
                });
                return activeTicketsArray;

            };


            return {
                setTickets: function (tickets) {
                    activeTicketSet = [];
                    activeTicketSet=formatOnlineSits(tickets);
                },
                clearHallSits: function clearHall() {
                    var sits = document.getElementsByClassName('place');
                    sits = Array.prototype.slice.call(sits);
                    sits.forEach(function (element) {
                        element.className = '';
                        element.className += 'place ';
                        element.className += 'place-bought';
                    })
                },
                setHallSits: function () {
                    activeTicketSet.forEach(function (element) {
                        var venue_sector = element.venue_sector;
                        var color = element.color;
                        var row = element.seat.row;
                        var place = element.seat.place;
                        var selectPlace=findSitInDOM(venue_sector,row,place);

                        if (selectPlace && selectPlace.tagName === 'LI') setSit(selectPlace, element, color);
                    })
                },
                compareTicketChanges: function (tickets) {

                    currectTicketSet=formatOnlineSits(tickets);

                    for (var i=0;i<currectTicketSet.length;i++) {
                        if (currectTicketSet[i].status!==activeTicketSet[i].status) {
                            activeTicketSet[i].status=currectTicketSet[i].status;
                        }
                     }
                    this.setHallSits();
                },
                setLegend: function (newLegend) {
                    legend = newLegend;
                },
                getLegend: function () {
                    return legend;
                }
            }
        }]);
