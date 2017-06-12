angular.module('hallDirectives', [])
    .directive('hallView', function () {
        return {
            restrict: 'E',
            templateUrl: "./views/Hall/Hall.html",
            controller: 'HallCtrl',

            link: function (scope, elem, attrs) {
                elem[0].addEventListener("click", function (event) {
                    if (event.target.tagName === 'LI'
                        &&!event.target.classList.contains('booked')
                        &&!event.target.classList.contains('place-bought')) {
                        var nodeParent = event.target;
                        var sitsData={};
                        sitsData.sit=event.target.getAttribute('data-place');
                        sitsData.cost=event.target.getAttribute('data-price');
                        sitsData.uuid=event.target.getAttribute('ticket-uuid');
                        sitsData.color=event.target.style.backgroundColor;
                        sitsData.performanseId=event.target.getAttribute('ticket-perfomance-id');

                        while (!sitsData.section) {
                            nodeParent = nodeParent.parentNode;
                            if (nodeParent.hasAttribute('data-row')) sitsData.row = nodeParent.getAttribute('data-row');
                            if (nodeParent.hasAttribute('data-section')) sitsData.section = nodeParent.getAttribute('data-section');
                        }

                        scope.addToCart(sitsData);
                        console.log(event.target);
                        event.target.className +='booked';
                        event.target.style.backgroundColor = '#a9a9a9';
                    }
                });
            }

        }
    })
    .filter('to_html', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);