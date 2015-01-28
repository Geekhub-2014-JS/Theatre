'use strict';

/* App Module */

var theatreApp = angular.module('theatre', ['ui.router', 'theatreServices', 'theatreControllers', 'theatreRoutes', 'pascalprecht.translate', 'ngCookies']);

theatreApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'translating/lang_',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('ua');
    $translateProvider.useLocalStorage();
}]);
