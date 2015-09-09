export /* @ngInject */ function mlThumbnails() {
  return {
    restrict: 'E',
    templateUrl: 'app/thumbnails/thumbnails.html',
    scope: {},
    controller: () => {},
    controllerAs: 'vm',
    bindToController: { data: '=' }
  };
}
