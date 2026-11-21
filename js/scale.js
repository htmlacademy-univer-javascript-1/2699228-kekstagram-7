const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_DEFAULT;

const applyScale = (value) => {
  currentScale = value;
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${value / 100})`;
};

smallerButton.addEventListener('click', () => {
  applyScale(Math.max(currentScale - SCALE_STEP, SCALE_MIN));
});

biggerButton.addEventListener('click', () => {
  applyScale(Math.min(currentScale + SCALE_STEP, SCALE_MAX));
});

const resetScale = () => applyScale(SCALE_DEFAULT);

// при загрузке модуля заменяем 55% из разметки на значение по умолчанию
resetScale();

export { resetScale };
