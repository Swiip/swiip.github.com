import { mlNavbar } from './navbar.directive';

export const navbar = 'swiip.navbar';

angular.module(navbar, [])
  .directive('mlNavbar', mlNavbar);
