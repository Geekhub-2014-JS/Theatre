angular.module('newsRightSidebar', [])
    .directive('newsBlock', ['apiGet', '$document', function (apiGet, $document) {
        return {
            restrict: 'E',
            templateUrl: "views/News/rightSidebarInNews.html",
            scope: {},
            link: function(scope, element) {
                scope.scrollTop = 0;
                $document.on('scroll', function(){
                    if (window.pageYOffset || document.documentElement.scrollTop) {
                        var step = 0;
                        step = window.pageYOffset || document.documentElement.scrollTop;
                        if (step > 140) {
                            var top = 20;
                            element.css({ top: top, position: "fixed" });
                        } else {
                            element.css({ top: "auto", position: "relative" });
                        }
                    }
                });

                scope.posters = [];
                var now = moment();
                var toDate = now.add(4, 'days');
                var url = 'performanceevents.json?fromDate=today&limit=4';
                apiGet(url)
                    .success(function(response, status){
                        if (status === 200) {
                            scope.posters = response.performance_events;
                        }
                    })
                    .error(function(error){
                        console.log(error);
                    });
            }
        }
    }]);