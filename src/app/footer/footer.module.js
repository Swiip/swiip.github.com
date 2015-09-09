import { mlFooter } from './footer.directive';

export const footer = 'swiip.footer';

angular.module(footer, [])
  .directive('mlFooter', mlFooter);
