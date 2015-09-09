import { navbar } from './navbar/navbar.module';
import { jumbotron } from './jumbotron/jumbotron.module';
import { major } from './major/major.module';
import { generator } from './generator/generator.module';
import { talks } from './talks/talks.module';
import { resume } from './resume/resume.module';
import { footer } from './footer/footer.module';
import { thumbnails } from './thumbnails/thumbnails.module';
import { main } from './main/main.module';

import { statesConfig } from './index.states';

export const swiip = 'swiip';

angular.module(swiip, [
  'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ui.bootstrap', 'duScroll',
  navbar, jumbotron, major, generator, talks, resume, footer, thumbnails, main
]).config(statesConfig);
