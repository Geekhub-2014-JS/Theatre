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
                    controller: 'homeCtrl'
                })
                .state('poster', {
                    url: "/poster",
                    templateUrl: "views/Poster/poster.html",
                    controller: 'posterCtrl'
                })
                .state('repertoire', {
                    url: "/repertoire",
                    templateUrl: "views/Repertoire/repertoire.html",
                    controller: 'repertoireCtrl'
                })
                .state('news', {
                    url: "/news",
                    templateUrl: "views/News/news.html",
                    controller: 'newsCtrl'
                })
                .state('about', {
                    url: "/about",
                    templateUrl: "views/About/about.html",
                    controller: "aboutCtrl"
                })
                .state('persons', {
                    url: "/persons",
                    templateUrl: "views/Persons/persons.html",
                    controller: 'personsCtrl'
                })
                .state('contacts', {
                    url: "/contacts",
                    templateUrl: "views/Contacts/contacts.html",
                    controller: "contactsCtrl"
                });

            $locationProvider.html5Mode(true);
        }
    )
;
