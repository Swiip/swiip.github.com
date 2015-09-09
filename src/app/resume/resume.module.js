import { mlResume } from './resume.directive';

export const resume = 'swiip.resume';

angular.module(resume, [])
  .directive('mlResume', mlResume);
