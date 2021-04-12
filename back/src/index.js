const puppeteer = require('puppeteer');
const url = 'https://www.192.com/atoz/people/anderson/john/';
const tableId = '#ont-result-content';
const iterateSurnamesByNames = require('./iterateSurnamesByNames');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector(tableId, {
      visible: true,
      timeout: 0,
    });

    await iterateSurnamesByNames(
      page,
      'https://www.192.com/atoz/people/clarke/50/b/'
    );

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();

/**
 * TODO
 * Move page switching with all awaits to utils function
 * Add resolve routing function for retrieving name from url
 * Add possibility to start iteration from given index
 */
