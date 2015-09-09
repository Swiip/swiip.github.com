import { major as majorConstant } from './major.constant';

export const major = 'swiip.major';

angular.module(major, [])
  .constant('major', majorConstant);
