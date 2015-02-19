'use strict';

/* ui-routing */

angular.module('theatreRoutes', ['ui.router', 'theatreControllers'])
    .config(
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: "/",
                    templateUrl: "views/HomePage/home.html",
                    controller: 'HomeCtrl'
                })
                .state('poster', {
                    url: "/poster",
                    templateUrl: "views/Poster/poster.html",
                    controller: 'PosterCtrl'
                })
                .state('repertoire', {
                    url: "/repertoire",
                    templateUrl: "views/Repertoire/repertoire.html",
                    controller: 'RepertoireCtrl'
                })
                .state('singlePerformance', {
                    url: '/performance/:slug',
                    templateUrl: "../views/Performance/performance.html",
                    controller: 'SinglePerformanceCtrl'
                })
                .state('news', {
                    url: "/news",
                    templateUrl: "views/News/news.html",
                    controller: 'NewsCtrl'
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "views/About/about.html",
                    controller: "AboutCtrl"
                })
                .state('persons', {
                    url: "/persons",
                    templateUrl: "views/Persons/persons.html",
                    controller: 'PersonsCtrl'
                })
                .state('contacts', {
                    url: "/contacts",
                    templateUrl: "views/Contacts/contacts.html",
                    controller: "ContactsCtrl"
                });

            $locationProvider.html5Mode(true);
        }
    )
;
