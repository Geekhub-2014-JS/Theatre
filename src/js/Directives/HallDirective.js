angular.module('hallDirectives', [])
    .directive('hallView', function () {
        return {
            restrict: 'E',
            template: "<div ng-include='getUrl()'></div>",
            controller: 'hallCtrl',

            link: function (scope, elem, attrs) {
                elem[0].addEventListener("click", function (event) {
                    if (event.target.tagName === 'LI') {
                        var nodeParent = event.target;
                        var sitsData={};
                        sitsData.sit=event.target.getAttribute('data-place');

                        while (!sitsData.row&&!sitsData.sits) {
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