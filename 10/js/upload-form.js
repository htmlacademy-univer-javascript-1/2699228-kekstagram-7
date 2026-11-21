import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
});

// превращает строку в массив хэш-тегов в нижнем регистре
const getHashtags = (value) => {
  const parts = value.trim().toLowerCase().split(' ');
  const hashtags = [];

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] !== '') {
      hashtags.push(parts[i]);
    }
  }

  return hashtags;
};

const validateHashtagFormat = (value) => {
  const hashtags = getHashtags(value);

  for (let i = 0; i < hashtags.length; i++) {
    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(hashtags[i])) {
      return false;
    }
  }

  return true;
};

const validateHashtagsCount = (value) => getHashtags(value).length <= MAX_HASHTAGS;

const validateHashtagsUnique = (value) => {
  const hashtags = getHashtags(value);

  for (let i = 0; i < hashtags.length; i++) {
    if (hashtags.indexOf(hashtags[i]) !== i) {
      return false;
    }
  }

  return true;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsField,
  validateHashtagFormat,
  'Хэш-тег начинается с #, содержит только буквы и цифры, длина от 2 до 20 символов, теги разделяются пробелами'
);
pristine.addValidator(hashtagsField, validateHashtagsCount, `Не больше ${MAX_HASHTAGS} хэш-тегов`);
pristine.addValidator(hashtagsField, validateHashtagsUnique, 'Хэш-теги не должны повторяться');
pristine.addValidator(commentField, validateComment, `Не больше ${MAX_COMMENT_LENGTH} символов`);

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  pristine.reset();
  resetScale();
  resetEffects();
};

function onDocumentKeydown(evt) {
  const isTextFieldActive =
    document.activeElement === hashtagsField || document.activeElement === commentField;

  if (evt.key === 'Escape' && !isTextFieldActive) {
    evt.preventDefault();
    closeForm();
  }
}

const openForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

fileInput.addEventListener('change', openForm);
cancelButton.addEventListener('click', closeForm);

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
