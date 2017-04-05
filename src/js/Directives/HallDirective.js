angular.module('hallDirectives', [])
    .directive('hallView', function () {
        return {
            restrict: 'E',
            template: "<div ng-include='getUrl()'></div>",
            controller: 'HallCtrl',

            link: function (scope, elem, attrs) {
                elem[0].addEventListener("click", function (event) {
                    if (event.target.tagName === 'LI'
                        &&!event.target.classList.contains('place-reserved')
                        &&!event.target.classList.contains('place-bought')) {
                        var nodeParent = event.target;
                        var sitsData={};
                        sitsData.sit=event.target.getAttribute('data-place');
                        sitsData.cost=event.target.getAttribute('data-price');

                        while (!sitsData.section) {
                            nodeParent = nodeParent.parentNode;
                            if (nodeParent.hasAttribute('data-row')) sitsData.row = nodeParent.getAttribute('data-row');
                            if (nodeParent.hasAttribute('data-section')) sitsData.section = nodeParent.getAttribute('data-section');
                        }

                        scope.addToCart(sitsData)
                    }
                });
            }

        }
    });