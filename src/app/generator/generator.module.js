import { mlGenerator } from './generator.directive';

export const generator = 'swiip.generator';

angular.module(generator, [])
  .directive('mlGenerator', mlGenerator);
