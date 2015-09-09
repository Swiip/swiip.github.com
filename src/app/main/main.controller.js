export class MainController {
  /* @ngInject */
  constructor(major, talks) {
    this.major = this.listMapper(major);
    this.talks = this.listMapper(talks);
  }

  listMapper(list) {
    const result = angular.copy(list);
    result.forEach(element => element.rank = Math.random());
    return result;
  }
}
