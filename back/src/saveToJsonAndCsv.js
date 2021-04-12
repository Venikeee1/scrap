const path = require('path');
const writeToCsv = require('./writeToCsv');
const fs = require('fs');

module.exports = (fileName, usersData) => {
  const usersListPath = path.resolve(__dirname, `../list/${fileName}.json`);
  const usersListCsvPath = path.resolve(__dirname, `../list/${fileName}.csv`);
  console.log('------Converting start-------');

  fs.writeFileSync(usersListPath, JSON.stringify(usersData, null, 2));
  writeToCsv(Object.values(usersData), usersListCsvPath);

  console.log('------Converting finished-------');
};
