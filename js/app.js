
angular.module('delegateExampleApp', [
  'ui.router',
  'ngSanitize',
  'ngAnimate'
])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      controller: 'ViewCtrl'
    })
    .state('view1', {
      url: '/view1',
      templateUrl: 'partials/view1.html',
      controller: 'ViewCtrl'
    })
    .state('view2', {
      url: '/view2',
      templateUrl: 'partials/view2.html',
      controller: 'ViewCtrl'
    });

    $urlRouterProvider.otherwise('/');
  })
  .controller('ViewCtrl', ['$scope', '$navBarDelegate', '$state', function ($scope, $navBarDelegate, $state) {
      // Update history
      $scope.trackHistory = function () {
        $navBarDelegate.$getByHandle('my-awesome-navbar')
          .trackHistory($state.current.name, $state.current.name);
      };
      $scope.history = function() {
        return $navBarDelegate.$getByHandle('my-awesome-navbar').getHistory();
      };
      // go to a view
      $scope.goToView = function (number) {
        // go to a view
        $state.transitionTo('view' + number);
        // animate title
        $navBarDelegate.$getByHandle('my-awesome-navbar')
          .changeTitle('View ' + number, true);
        // show back button
        $navBarDelegate.$getByHandle('my-awesome-navbar')
          .showBackButton(true);
        $scope.trackHistory();
      };
      // loading message
      $scope.loading = function () {
        $navBarDelegate.$getByHandle('my-awesome-navbar')
          .changeTitle('Loading stuff... ', true);
      };
  }]);