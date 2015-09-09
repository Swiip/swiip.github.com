export /* @ngInject */ function statesConfig ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      template: '<ml-main></ml-main>'
    });

  $urlRouterProvider.otherwise('/');
}
