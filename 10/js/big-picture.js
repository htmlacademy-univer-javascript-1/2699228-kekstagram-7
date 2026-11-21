const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_STEP = 5;
const shownCountElement = bigPicture.querySelector('.social__comment-shown-count');

let currentComments = [];
let shownCount = 0;

const createComment = (comment) => {
  const item = document.createElement('li');
  item.classList.add('social__comment');

  const avatar = document.createElement('img');
  avatar.classList.add('social__picture');
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  item.appendChild(avatar);
  item.appendChild(text);

  return item;
};

// добавляет в список следующую порцию комментариев
const renderNextComments = () => {
  const fragment = document.createDocumentFragment();
  let end = shownCount + COMMENTS_STEP;

  if (end > currentComments.length) {
    end = currentComments.length;
  }

  for (let i = shownCount; i < end; i++) {
    fragment.appendChild(createComment(currentComments[i]));
  }

  commentsList.appendChild(fragment);
  shownCount = end;
  shownCountElement.textContent = shownCount;

  // кнопка нужна, только пока есть непоказанные комментарии
  if (shownCount >= currentComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  caption.textContent = photo.description;
  currentComments = photo.comments;
  shownCount = 0;
  commentsList.innerHTML = '';
  commentCountBlock.classList.remove('hidden');
  renderNextComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderNextComments);

export { openBigPicture };
