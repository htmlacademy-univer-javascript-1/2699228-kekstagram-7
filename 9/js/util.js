// случайное целое число от min до max включительно
const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// случайный элемент массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

export { getRandomInteger, getRandomArrayElement };
