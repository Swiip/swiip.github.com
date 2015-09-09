import { navbar } from './navbar/navbar.module';
import { jumbotron } from './jumbotron/jumbotron.module';
import { major } from './major/major.module';
import { thumbnails } from './thumbnails/thumbnails.module';
import { main } from './main/main.module';

import { statesConfig } from './index.states';

export const swiip = 'swiip';

angular.module(swiip, [
  'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap',
  navbar, jumbotron, major, thumbnails, main
]).config(statesConfig);
