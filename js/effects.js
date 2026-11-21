const EFFECTS = {
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const effectsList = document.querySelector('.img-upload__effects');
const previewImage = document.querySelector('.img-upload__preview img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const levelInput = document.querySelector('.effect-level__value');

let currentEffect = null;

noUiSlider.create(slider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', () => {
  if (currentEffect === null) {
    return;
  }

  const value = Number(slider.noUiSlider.get());

  levelInput.value = value;
  previewImage.style.filter = `${currentEffect.filter}(${value}${currentEffect.unit})`;
});

const setEffect = (name) => {
  if (name === 'none') {
    currentEffect = null;
    previewImage.style.filter = '';
    levelInput.value = '';
    sliderContainer.classList.add('hidden');
    return;
  }

  currentEffect = EFFECTS[name];
  sliderContainer.classList.remove('hidden');

  slider.noUiSlider.updateOptions({
    range: { min: currentEffect.min, max: currentEffect.max },
    step: currentEffect.step,
    start: currentEffect.max,
  });
  // уровень эффекта сбрасывается на максимум при каждом переключении
  slider.noUiSlider.set(currentEffect.max);
};

effectsList.addEventListener('change', (evt) => {
  setEffect(evt.target.value);
});

const resetEffects = () => setEffect('none');

// начальное состояние: без эффекта, слайдер скрыт
resetEffects();

export { resetEffects };
