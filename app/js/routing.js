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
                .state('app.singlePerformance', {
                    url: '/performance/:slug',
                    templateUrl: "views/Performance/performance.html",
                    controller: 'SinglePerformanceCtrl'
                })
                .state('app.news', {
                    url: "/news",
                    templateUrl: "views/News/news.html",
                    controller: 'NewsCtrl'
                })
                .state('app.newsDetail', {
                    url: '/news/:id',
                    templateUrl: 'views/News/detail.html',
                    controller: 'NewsDetailCtrl'
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
                .state('app.personDetails', {
                    url: '/persons/:id',
                    templateUrl: "views/Persons/details.html",
                    controller: 'PersonsDetailCtrl'
                })
                .state('app.contacts', {
                    url: "/contacts",
                    templateUrl: "views/Contacts/contacts.html",
                    controller: "ContactsCtrl"
                })
                .state('app.photos', {
                    url: "/photos",
                    templateUrl: "views/PhotoArchive/photoarchive.html",
                    controller: "PhotoArchiveCtrl"
                })
                .state('app.videos', {
                    url: "/videos",
                    templateUrl: "views/VideoArchive/videoarchive.html",
                    controller: "VideoArchiveCtrl"
                })
                .state('app.board', {
                    url: "/board",
                    templateUrl: "views/Static/board.html"
                })
                .state('app.partners', {
                    url: "/partners",
                    templateUrl: "views/Static/partners.html"
                })
                .state('app.fest', {
                    url: "/festivals",
                    templateUrl: "views/Festivals/festivals.html"
                })
            ;
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);
