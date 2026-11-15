import { getRandomInteger, getRandomArrayElement } from './util.js';

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MAX_COMMENTS = 30;

const DESCRIPTIONS = [
  'Отличный закат на море',
  'Утренний кофе в любимом кафе',
  'Прогулка по осеннему парку',
  'Мой кот в своей стихии',
  'Вид из окна поезда',
  'Вечерний город в огнях',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артём', 'Мария', 'Иван', 'Ольга', 'Дмитрий', 'Анна'];

let lastCommentId = 0;

const createMessage = () => {
  let message = getRandomArrayElement(MESSAGES);

  if (getRandomInteger(1, 2) === 2) {
    let secondSentence = getRandomArrayElement(MESSAGES);

    while (secondSentence === message) {
      secondSentence = getRandomArrayElement(MESSAGES);
    }

    message = `${message} ${secondSentence}`;
  }

  return message;
};

const createComment = () => {
  lastCommentId++;

  return {
    id: lastCommentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = (index) => {
  const comments = [];
  const commentsCount = getRandomInteger(0, MAX_COMMENTS);

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return {
    id: index,
    url: `photos/${index}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: comments,
  };
};

const createPhotos = () => {
  const result = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    result.push(createPhoto(i));
  }

  return result;
};

export { createPhotos };
