const { parse } = require('node-html-parser');
const { BASE_URL } = require('../settings');

module.exports = (rawHtml) => {
  const users = parse(rawHtml).querySelectorAll('.ont-results-item-name');

  return users.reduce((acc, item) => {
    const userData = getUserInfo(item);

    if (hasRequiredFields(userData)) {
      acc.push(userData);
    }

    return acc;
  }, []);
};

const getUserInfo = (userElement) => {
  const linkEl = userElement.querySelector('.test-name a');
  const yearEl = userElement.querySelector('.test-er-years');
  const positionEl = userElement.querySelector('.test-director');
  const ageEl = userElement.querySelector('.age-guide-value');

  return {
    name: linkEl && linkEl.text.trim(),
    link: linkEl && `${BASE_URL}${linkEl.getAttribute('href')}`,
    year: yearEl && yearEl.text.trim(),
    position: positionEl && positionEl.text.trim(),
    age: ageEl && ageEl.text.trim(),
  };
};

const hasRequiredFields = (userElement) => {
  const { year, position, age } = userElement;
  const yearLimit = 18;

  if (!year || !position || !age) return false;

  const yearLustNumbers = +year.slice(-2);
  const currentAge = +age.slice(-2).trim();

  if (yearLustNumbers <= yearLimit) return false;
  if (position.toLowerCase() !== 'director') return false;
  if (currentAge > 65) return false;

  return true;
};
