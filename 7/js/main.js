import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';

const photos = createPhotos();
renderThumbnails(photos, openBigPicture);
