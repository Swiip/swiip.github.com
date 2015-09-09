import { talks as talksConstant } from './talks.constant';

export const talks = 'swiip.talks';

angular.module(talks, [])
  .constant('talks', talksConstant);
