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
    'singlePerf'
]);
theatreControllers.controller('translateCtrl', ['$scope', '$translate', '$stateParams', '$state',
    function($scope, $translate, $stateParams, $state){
        $scope.chLocale = function(lng) {
            $translate.use(lng);
            $stateParams.locale = lng;
            $state.reload();
        };
    }
]);