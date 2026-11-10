// 1. Проверка длины строки
const checkStringLength = (string, maxLength) => {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
};

checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false


// 2. Проверка на палиндром
const isPalindrome = (string) => {
  const lowerString = string.toLowerCase();
  let cleaned = '';

  // собираем строку без пробелов
  for (let i = 0; i < lowerString.length; i++) {
    if (lowerString[i] !== ' ') {
      cleaned += lowerString[i];
    }
  }

  // сравниваем символы с двух концов
  for (let i = 0; i < cleaned.length / 2; i++) {
    if (cleaned[i] !== cleaned[cleaned.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true


// 3. Дополнительное: извлечение цифр
const extractNumber = (value) => {
  const string = String(value);
  let digits = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      digits += string[i];
    }
  }

  if (digits === '') {
    return NaN;
  }

  return Number(digits);
};

extractNumber('2023 год'); // 2023
extractNumber('ECMAScript 2022'); // 2022
extractNumber('1 кефир, 0.5 батона'); // 105
extractNumber('агент 007'); // 7
extractNumber('а я томат'); // NaN
extractNumber(2023); // 2023
extractNumber(-1); // 1
extractNumber(1.5); // 15
