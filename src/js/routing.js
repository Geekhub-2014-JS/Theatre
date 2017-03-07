'use strict';

/* ui-routing */

angular.module('theatreRoutes', ['ui.router', 'theatreControllers'])
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise("/uk/");
            $stateProvider
                .state('app',{
                    abstract: true,
                    url: '/{locale}',
                    template: '<ui-view/>'
                })
                .state('app.home', {
                    url: "/",
                    templateUrl: "views/HomePage/home.html",
                    controller: 'HomeCtrl',
                    data: {
                        pageTitle: "menu.logo"
                    }
                })
                .state('app.poster', {
                    url: "/poster",
                    templateUrl: "views/Poster/poster.html",
                    controller: 'PosterCtrl',
                    data: {
                        pageTitle: "menu.poster"
                    }
                })
                .state('app.repertoire', {
                    url: "/repertoire",
                    templateUrl: "views/Repertoire/repertoire.html",
                    controller: 'RepertoireCtrl',
                    data: {
                        pageTitle: "menu.repertoire"
                    }
                })
                .state('app.singlePerformance', {
                    url: '/performance/:slug',
                    templateUrl: "views/Performance/performance.html",
                    controller: 'SinglePerformanceCtrl'
                })
                .state('app.news', {
                    url: "/news",
                    templateUrl: "views/News/news.html",
                    controller: 'NewsCtrl',
                    data: {
                        pageTitle: "menu.news"
                    }
                })
                .state('app.newsDetail', {
                    url: '/news/:id',
                    templateUrl: 'views/News/detail.html',
                    controller: 'NewsDetailCtrl'
                })
                .state('app.about', {
                    url: "/about",
                    templateUrl: "views/About/about.html",
                    controller: "AboutCtrl",
                    data: {
                        pageTitle: "menu.about"
                    }
                })
                .state('app.aboutDetail', {
                    url: "/about/:slug",
                    templateUrl: "views/About/aboutDetail.html",
                    controller: "AboutDetailCtrl"
                })
                .state('app.persons', {
                    url: "/persons",
                    templateUrl: "views/Persons/persons.html",
                    controller: 'PersonsCtrl',
                    data: {
                        pageTitle: "menu.persons"
                    }
                })
                .state('app.personDetails', {
                    url: '/persons/:id',
                    templateUrl: "views/Persons/details.html",
                    controller: 'PersonsDetailCtrl'
                })
                .state('app.contacts', {
                    url: "/contacts",
                    templateUrl: "views/Contacts/contacts.html",
                    controller: "ContactsCtrl",
                    data: {
                        pageTitle: "menu.contacts"
                    }
                })
                .state('app.photos', {
                    url: "/photos",
                    templateUrl: "views/PhotoArchive/photoarchive.html",
                    controller: "PhotoArchiveCtrl",
                    data: {
                        pageTitle: "menu.photoarchive"
                    }
                })
                .state('app.videos', {
                    url: "/videos",
                    templateUrl: "views/VideoArchive/videoarchive.html",
                    controller: "VideoArchiveCtrl",
                    data: {
                        pageTitle: "menu.video"
                    }
                })
                .state('app.board', {
                    url: "/board",
                    templateUrl: "views/Static/board.html",
                    data: {
                        pageTitle: "menu.board"
                    }
                })
                .state('app.partners', {
                    url: "/partners",
                    templateUrl: "views/Static/partners.html"
                })
                .state('app.fest', {
                    url: "/festivals",
                    templateUrl: "views/Festivals/festivals.html",
                    data: {
                        pageTitle: "menu.fest"
                    }
                })
                .state('app.hall', {
                    url: "/hall",
                    template: "<hall-view></hall-view>",
                    data: {
                        pageTitle: "menu.hall"
                    }
                })

            ;
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    ]);
