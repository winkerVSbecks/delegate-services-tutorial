angular.module('delegateExampleApp')
  .directive('navBar', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: true,
      controller: 'NavBarCtrl',
      templateUrl: 'navbar/navbar.html',
      link: function (scope, iElement, iAttrs, NavBarCtrl) {
        // Set Title
        scope.title = iAttrs.title || '';
        // Set animation style
        if (angular.isDefined(iAttrs.animation)) {
          iElement.addClass(iAttrs.animation);
        } else {
          iElement.addClass('nav-title-slide-ios7');
        }
        //defaults
        scope.showBackButton = false;
        scope.shouldAnimate = true;
        scope.isInvisible = false;
        scope.isReverse = false;

        scope.back = function () {
          NavBarCtrl.back();
        };

        scope.$watch(function() {
          return (scope.isReverse ? ' reverse' : '') +
            (scope.isInvisible ? ' invisible' : '') +
            (!scope.shouldAnimate ? ' no-animation' : '');
        }, function(className, oldClassName) {
          iElement.removeClass(oldClassName);
          iElement.addClass(className);
        });
      }
    };
  }]);