'use strict';

/* App Module */

var theatreApp = angular.module('theatre', [
        'ui.router',
        'pascalprecht.translate',
        'theatreServices',
        'theatreControllers',
        'theatreRoutes',
        'ngCookies',
        'theatreDirectives',
        'darthwade.dwLoading',
        'infinite-scroll',
        'ngSanitize',
        'uiGmapgoogle-maps',
        'bootstrapLightbox'
    ]);

