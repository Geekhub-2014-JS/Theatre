'use strict';

/* Services */

var theatreServices = angular.module('theatreServices', []);

theatreServices
    //.constant('api_url', 'http://api.theatre.pp.ua/')
    .constant('api_url', 'http://api.staging.theatre.pp.ua/')
    .factory('apiPost', ['$http', 'api_url', '$stateParams', '$rootScope',
        function ($http, api_url, $stateParams, $rootScope) {
            return function (url, data) {
                var conf = {
                    method: 'POST',
                    url: api_url + url,
                    headers: {
                        'locale': $stateParams.locale,
                        'API-Key-Token':''
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
        var totalSum=0;
        return {
            addPlaceToCart: function (orders) {
                order.push({
                    row: orders.row,
                    sit: orders.sit,
                    cost: orders.cost,
                    section: orders.section
                });
                totalSum+=+orders.cost;
            },
            getPlaceToCart: function () {
                return order;
            },
            delPlaceFromCart: function (index) {
                totalSum-=+order[index].cost;
                order.splice(index, 1);

            },
            clearCart:function () {
                order = [];
                totalSum=0;
            }
        }

    })

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

    .factory('userService', function () {
        var currentUser = {};
        var customer={};
        return {
            addUser: function (user) {
                currentUser=user;
            },

            getCurrentUser: function () {
                return currentUser;
            },

            setNetwork: function (network) {
                currentUser.network=network;
            },

            setApiToken: function (accessToken) {
                currentUser.accessToken=accessToken;
            }
        }
    })

    .factory('timerService', function () {
        var timer;
        return {
            getTime:    function getTimeRemaining(){
                var t = Date.parse(timer) - Date.parse(new Date());
                var seconds = Math.floor( (t/1000) % 60 );
                var minutes = Math.floor( (t/1000/60) % 60 );
                var hours = Math.floor( (t/(1000*60*60)) % 24 );
                var days = Math.floor( t/(1000*60*60*24) );
                return {
                    'total': t,
                    'minutes': minutes,
                    'seconds': ('0'+parseInt(seconds)).slice(-2) //seconds
                };
            },

            setCurrentTimer: function (newTimer) {
                if (!newTimer) timer=0;
               if (!timer) timer=newTimer;

            },
            getCurrentTimer:function () {
                return timer;
            }
        }
    })

    .factory('ticketService',['$document',
        function () {
        var currectTicketSet;

        function setSit(selectPlace,element) {
            selectPlace.className='';
            selectPlace.className+='place ';
            selectPlace.className+=element.seat.price_category.title+' ';
            selectPlace.className+=element.status+ ' ';
            selectPlace.setAttribute('data-price',element.price);
            selectPlace.setAttribute('ticket-uuid',element.id);
            selectPlace.style.backgroundColor=element.seat.price_category.color;
        }
        return {
            setTickets: function (tickets) {
                currectTicketSet=tickets;
            },
            clearHallSits: function clearHall(){
            var sits = document.getElementsByClassName('place');
            sits=Array.prototype.slice.call(sits);
            sits.forEach(function (element) {
                element.className='';
                element.className+='place ';
                element.className+='place-bought';

            })
            },
            setHallSits: function () {
                currectTicketSet.forEach(function (element) {
                    var venue_sector = element.seat.venue_sector.title;
                    var row=element.seat.row;
                    var place=element.seat.place;
                    var selectPlace=document.querySelector('.'+venue_sector);
                    selectPlace=selectPlace.querySelector('[data-row="'+row+'"], [data-place="'+place+'"]');
                    setSit(selectPlace,element);

                })
            },
            compareTicketChanges: function (tickets) {
                for (var i=0;i<currectTicketSet.length;i++) {
                    if (currectTicketSet[i].status!==tickets[i].status) {
                        currectTicketSet[i]=tickets[i];
                        var venue_sector = tickets[i].seat.venue_sector.title;
                        var selectPlace=document.querySelector('.'+venue_sector);
                        var row=tickets[i].seat.row;
                        var place=tickets[i].seat.place;
                        selectPlace=selectPlace.querySelector('[data-row="'+row+'"], [data-place="'+place+'"]');
                        setSit(selectPlace,tickets[i]);
                    }
                }
            }
        }
    }] );
