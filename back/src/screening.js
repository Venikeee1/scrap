const fs = require('fs');
const parse = require('node-html-parser').parse;
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.192.com/atoz/people/');
    await page.waitForSelector('.js-ont-people-atoz-surnames', {
      visible: true,
      timeout: 0,
    });

    const rawHtml = await page.$eval('.js-ont-people-atoz-surnames', (el) => {
      return el.innerHTML;
    });
    const li = parse(rawHtml).querySelectorAll('a');
    console.log([...li].map((item) => item.getAttribute('href')));

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();

// axios.get('https://www.192.com/atoz/people/').then(({ data }) => {
//   const root = parse(data);
//   console.log(root);
//   console.log(root.text);
// });

// https
//   .get('https://www.192.com/atoz/people/', (res) => {
//     // console.log('statusCode:', res.statusCode);
//     // console.log('headers:', res);

//     res.on('data', (d) => {
//       console.log(d);
//       // process.stdout.write(d);
//       // const a = parse(process.stdout.write(d));
//       // console.log(a.querySelector('.js-ont-people-atoz-surnames a'));
//     });
//   })
//   .on('error', (e) => {
//     console.error(e);
//   });

// process.on('exit', function (code) {
//   fs.writeFileSync('hello.txt', 'Привет ми ми ми!');
//   return console.log(`About to exit with code ${code}`);
// });
