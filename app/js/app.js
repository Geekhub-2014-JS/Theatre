'use strict';

/* App Module */

var theatreApp = angular.module('theatre', [
                                            'ui.router',
                                            'theatreServices',
                                            'theatreControllers', '' +
                                            'theatreRoutes',
                                            'pascalprecht.translate',
                                            'ngCookies',
                                            'theatreDirectives'
                                            ]);

theatreApp.config(['$translateProvider', '$httpProvider', function($translateProvider, $httpProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'translating/lang_',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('ua');
    $translateProvider.useLocalStorage();

    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function( data ) {

        return angular.isObject( data ) && String( data ) !== '[object File]' ? angular.toParam( data ) : data;
    };
}]);
