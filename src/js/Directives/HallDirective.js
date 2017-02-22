angular.module('hallDirectives', [])
    .directive('hallView', function (hallService) {
        return {
            restrict: 'E',
            template: "<div ng-include='getUrl()'></div>",
            controller:'hallCtrl',

            link:function (scope,elem,attrs) {
                elem[0].addEventListener("click", function(event){
                    if (event.target.tagName==='LI')
                        scope.addToCart(event.target.getAttribute('data-sits'))
                });
            }

        }
    });