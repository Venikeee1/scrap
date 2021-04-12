const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');

module.exports = (users, path) => {
  const body = convertArrayToCSV(users);
  const filePath = path || 'table.csv';
  fs.writeFileSync(filePath, body, 'utf-8');
};
