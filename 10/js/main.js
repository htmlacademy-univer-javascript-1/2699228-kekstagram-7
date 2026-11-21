import { createPhotos } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './big-picture.js';
import './upload-form.js';

const photos = createPhotos();
renderThumbnails(photos, openBigPicture);
