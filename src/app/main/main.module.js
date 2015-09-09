import { MainController } from './main.controller';
import { mlMain } from './main.directive';

export const main = 'swiip.main';

angular.module(main, [])
  .controller('MainController', MainController)
  .directive('mlMain', mlMain);
