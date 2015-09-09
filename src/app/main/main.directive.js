export /* @ngInject */ function mlMain() {
  return {
    restrict: 'E',
    templateUrl: 'app/main/main.html',
    scope: {},
    controller: 'MainController',
    controllerAs: 'vm'
  };
}
