'use strict';

/* ui-routing */

angular.module('theatreRoutes', ['ui.router', 'theatreControllers'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/ua/");
            $stateProvider
                .state('app',{
                    abstract: true,
                    url: '/{locale}',
                    template: '<ui-view/>'
                })
                .state('app.home', {
                    url: "/",
                    templateUrl: "views/HomePage/home.html",
                    controller: 'HomeCtrl'
                })
                .state('app.poster', {
                    url: "/poster",
                    templateUrl: "views/Poster/poster.html",
                    controller: 'PosterCtrl'
                })
                .state('app.repertoire', {
                    url: "/repertoire",
                    templateUrl: "views/Repertoire/repertoire.html",
                    controller: 'RepertoireCtrl'
                })
                .state('app.news', {
                    url: "/news",
                    templateUrl: "views/News/news.html",
                    controller: 'NewsCtrl'
                })
                .state('app.about', {
                    url: "/about",
                    templateUrl: "views/About/about.html",
                    controller: "AboutCtrl"
                })
                .state('app.persons', {
                    url: "/persons",
                    templateUrl: "views/Persons/persons.html",
                    controller: 'PersonsCtrl'
                })
                .state('app.contacts', {
                    url: "/contacts",
                    templateUrl: "views/Contacts/contacts.html",
                    controller: "ContactsCtrl"
                });
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ])
;
