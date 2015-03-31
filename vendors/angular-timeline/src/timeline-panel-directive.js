'use strict';

angular.module('angular-timeline').directive('timelinePanel', function() {
  return {
    require: '^timeline',
    restrict: 'AE',
    replace: true,
    transclude: true,
    template: '<div class="timeline-panel" ng-transclude></div>'
  };
});
