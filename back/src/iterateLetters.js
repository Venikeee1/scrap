const letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'pq',
  'r',
  's',
  't',
  'uv',
];

const createUrl = (letter) => {
  return `https://www.192.com/atoz/people/surname/${letter}/50/`;
};

const mainContentSelector = '.js-ont-people-atoz-body';
const paginationSelector = '.js-ont-people-atoz-number-pagination';

module.exports = async (page) => {
  for (let letter of letters) {
    const url = createUrl(letter);
    await page.goto(url);
    await page.waitForSelector(mainContentSelector, {
      visible: true,
      timeout: 0,
    });

    const rawHtml = await page.$eval(mainContentSelector, (el) => {
      return el.innerHTML;
    });
  }
};
