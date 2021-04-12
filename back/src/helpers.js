/**
 *
 * @param {string} url
 * @param {string} selector
 * @param {PuppeteerPage} page
 */

module.exports.goToPageAndWaitForSelector = async (page, url, selector) => {
  await page.goto(url);
  await page.waitForSelector(selector, {
    visible: true,
    timeout: 0,
  });
  await page.waitForTimeout(1000);
};
