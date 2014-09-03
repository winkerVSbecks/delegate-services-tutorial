angular.module('delegateExampleApp')
  .controller('NavBarCtrl', [
    '$scope',
    '$element',
    '$attrs',
    '$animate',
    '$compile',
    '$navBarDelegate',
    '$state',
  function($scope, $element, $attrs, $animate, $compile, $navBarDelegate, $state) {
    var deregisterInstance = $navBarDelegate._registerInstance(this, $attrs.delegateHandle);

    $scope.$on('$destroy', deregisterInstance);

    var self = this;

    $scope.history = [];

    this.leftButtonsElement = angular.element(
      $element[0].querySelector('.buttons.left-buttons')
    );
    this.rightButtonsElement = angular.element(
      $element[0].querySelector('.buttons.right-buttons')
    );

    this.back = function() {
      if($scope.history.length > 0) {
        $state.go($scope.history[$scope.history.length-1].state);
        this.changeTitle($scope.history[$scope.history.length-1].title, 'back');
        $scope.history.pop();
        if($scope.history === 'home') {
          this.showBackButton(false);
        }
      }
      return false;
    };

    this.align = function(direction) {
      this._headerBarView.align(direction);
    };

    this.showBackButton = function(show) {
      if (arguments.length) {
        $scope.showBackButton = !!show;
      }
      return !!($scope.hasBackButton && $scope.showBackButton);
    };

    this.showBar = function(show) {
      if (arguments.length) {
        $scope.isInvisible = !show;
        $scope.$parent.$hasHeader = !!show;
      }
      return !$scope.isInvisible;
    };

    this.setTitle = function(title) {
      if ($scope.title === title) {
        return;
      }
      $scope.oldTitle = $scope.title;
      $scope.title = title || '';
    };

    this.changeTitle = function(title, direction) {
      if ($scope.title === title) {
        return false;
      }
      this.setTitle(title);
      $scope.isReverse = direction == 'back';
      $scope.shouldAnimate = !!direction;

      if ($scope.shouldAnimate) {
        this._animateTitles();
      }
      return true;
    };

    this.getTitle = function() {
      return $scope.title || '';
    };

    this.getPreviousTitle = function() {
      return $scope.oldTitle || '';
    };

    this.getReverse = function() {
      return $scope.isReverse || false;
    };

    this.trackHistory = function (previousState, title) {
      if(angular.isDefined(previousState))
        $scope.history.push({
          state: previousState,
          title: title
        });
    };

    this.getHistory = function () {
      return $scope.history;
    };

    this._animateTitles = function() {
      var oldTitleEl, newTitleEl, currentTitles;

      //If we have any title right now
      //(or more than one, they could be transitioning on switch),
      //replace the first one with an oldTitle element
      currentTitles = $element[0].querySelectorAll('.title');
      if (currentTitles.length) {
        oldTitleEl = $compile('<h1 class="title" ng-bind-html="oldTitle"></h1>')($scope);
        angular.element(currentTitles[0]).replaceWith(oldTitleEl);
      }
      //Compile new title
      newTitleEl = $compile('<h1 class="title invisible" ng-bind-html="title"></h1>')($scope);

      //Animate in on next frame
      window.requestAnimationFrame(function() {

        oldTitleEl && $animate.leave(angular.element(oldTitleEl));

        var insert = oldTitleEl && angular.element(oldTitleEl) || null;
        $animate.enter(newTitleEl, $element, insert);

        //Cleanup any old titles leftover (besides the one we already did replaceWith on)
        angular.forEach(currentTitles, function(el) {
          if (el && el.parentNode) {
            //Use .remove() to cleanup things like .data()
            angular.element(el).remove();
          }
        });

        //$apply so bindings fire
        $scope.$digest();

        //Stop flicker of new title on ios7
        window.requestAnimationFrame(function() {
          newTitleEl[0].classList.remove('invisible');
        });
      });
    };
  }]);
