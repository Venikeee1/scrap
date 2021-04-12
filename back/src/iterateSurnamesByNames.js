const fs = require('fs');
const { parse } = require('node-html-parser');
const { BASE_URL } = require('../settings');
const contentSelector = '.js-ont-people-atoz-body';
const findUsersWithRequiredFields = require('./findUsersWithRequiredFields');
const tableId = '#ont-result-content';
const saveToJsonAndCsv = require('./saveToJsonAndCsv');
const { goToPageAndWaitForSelector } = require('./helpers');
const MATCHES_LIMIT = process.env.npm_config_limit;
let currentUserList;
let fileName;

module.exports = async (page, url) => {
  // getting params from page url
  const fileChunks = url.split('/');
  fileName = `${fileChunks[5]}-${fileChunks[7]}`;

  console.log(fileName);

  try {
    currentUserList = require(`./list/${fileName}.json`);
  } catch (error) {
    currentUserList = {};
  }

  await goToPageAndWaitForSelector(page, url, contentSelector);

  const rawHtml = await page.$eval(contentSelector, (el) => {
    return el.innerHTML;
  });
  const contentElement = parse(rawHtml);
  const paginationLinksElements = contentElement.querySelectorAll(
    '.js-ont-people-atoz-number-pagination a'
  );
  paginationLinks =
    paginationLinksElements.length > 0
      ? paginationLinksElements.map(
          (item) => `${BASE_URL}${item.getAttribute('href')}`
        )
      : [url];

  for (let pageLink of paginationLinks) {
    console.log(`Opening url ---- ${pageLink}`);
    await goToPageAndWaitForSelector(page, pageLink, contentSelector);

    const rawHtml = await page.$eval(contentSelector, (el) => {
      return el.innerHTML;
    });

    const pageContent = parse(rawHtml);

    const fullNamesLinks = pageContent
      .querySelectorAll('.js-ont-people-atoz-surnames a')
      .map((item) => `${BASE_URL}${item.getAttribute('href')}`);

    for (let userLink of fullNamesLinks) {
      console.log(`Opening User link ---- ${userLink}`);
      await goToPageAndWaitForSelector(page, userLink, tableId);

      const rawHtml = await page.$eval(tableId, (el) => {
        return el.innerHTML;
      });

      const newUsers = findUsersWithRequiredFields(rawHtml);
      newUsers.forEach((user) => {
        currentUserList[user.link] = user;
      });

      if (
        MATCHES_LIMIT &&
        Object.keys(currentUserList).length >= MATCHES_LIMIT
      ) {
        console.log('Достигло лимита');
        break;
      }
    }

    saveToJsonAndCsv(fileName, currentUserList);

    if (MATCHES_LIMIT && Object.keys(currentUserList).length >= MATCHES_LIMIT)
      break;
  }

  console.log(`Process finished for -- file:${fileName}`);
};

// save file on terminating script

process.on('exit', function (code) {
  if (code !== 130) return;
  saveToJsonAndCsv(fileName, currentUserList);
  return console.log(`About to exit with code ${code}`);
});
