angular.module('delegateExampleApp')
  .service('$navBarDelegate', delegateService([
    'back',
    'showBackButton',
    'showBar',
    'setTitle',
    'changeTitle',
    'getTitle',
    'getPreviousTitle',
    'getReverse',
    'trackHistory',
    'getHistory'
  ]));