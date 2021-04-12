const path = require('path');
const writeToCsv = require('./writeToCsv');
const fs = require('fs');

module.exports = (fileName, usersData) => {
  const usersListPath = path.resolve(__dirname, `../list/${fileName}.json`);
  const usersListCsvPath = path.resolve(__dirname, `../list/${fileName}.csv`);
  let fileData;
  console.log('------Converting start-------');

  try {
    fileData = JSON.parse(fs.readFileSync(usersListPath, 'utf-8'));
  } catch (error) {
    fileData = {};
  }
  const payload = { ...fileData, ...usersData };

  fs.writeFileSync(usersListPath, JSON.stringify(payload, null, 2));
  writeToCsv(Object.values(payload), usersListCsvPath);

  console.log('------Converting finished-------');
};
