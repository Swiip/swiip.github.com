import { mlJumbotron } from './jumbotron.directive';

export const jumbotron = 'swiip.jumbotron';

angular.module(jumbotron, [])
  .directive('mlJumbotron', mlJumbotron);
