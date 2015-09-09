import { mlThumbnails } from './thumbnails.directive';

export const thumbnails = 'swiip.thumbnails';

angular.module(thumbnails, [])
  .directive('mlThumbnails', mlThumbnails);
