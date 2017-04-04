angular.module('ticketRegistrationDirectives', [])
    .directive('ticketRegistration', function () {
        return {
            restrict: 'E',
            templateUrl: "views/ticketRegistration/ticketRegistration.html",
           controller: 'CartCtrl',
           controllerAs: 'cart'
        }
    });