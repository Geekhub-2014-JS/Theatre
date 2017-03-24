'use strict';

/* Controllers */

var theatreControllers = angular.module('theatreControllers', [
    'about',
    'contacts',
    'home',
    'news',
    'person',
    'poster',
    'repertoire',
    'singlePerf',
    'videoArchive',
    'photoArchive',
    'cart',
    'hall',
    'Login'
]);
theatreControllers.controller('translateCtrl', ['$scope', '$translate', '$stateParams', '$state',
    function($scope, $translate, $stateParams, $state){

        $scope.chLocale = function() {
            var lng = '';
            if ($stateParams.locale === 'uk') {
                lng = 'en';
            } else {
                lng = 'uk';
            }
            $translate.use(lng);
            $stateParams.locale = lng;
            $state.reload();
        };
    }
]);