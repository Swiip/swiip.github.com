export class MainController {
  /* @ngInject */
  constructor(major) {
    this.major = angular.copy(major);
    this.major.forEach(thumbnail => thumbnail.rank = Math.random());
  }
}
