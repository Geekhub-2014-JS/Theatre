angular.module('ticketRegistrationDirectives', [])
    .directive('ticketRegistration', function () {
        return {
            restrict: 'E',
            templateUrl: "views/TicketRegistration/ticketRegistration.html",
           controller: 'CartCtrl',
           controllerAs: 'cart'
        }
    });