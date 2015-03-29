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
    'photoArchive'
]);
theatreControllers.controller('translateCtrl', ['$scope', '$translate', '$stateParams', '$state',
    function($scope, $translate, $stateParams, $state){

        $scope.chLocale = function() {
            var lng = '';
            if ($stateParams.locale === 'ua') {
                lng = 'en';
            } else {
                lng = 'ua';
            }
            $translate.use(lng);
            $stateParams.locale = lng;
            $state.reload();
        };
    }
]);