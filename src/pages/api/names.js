// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const path = require('path');
const fs = require('fs');

export default (req, res) => {
  let result = {};

  fs.readdirSync(path.resolve('./back/list')).forEach(function (fileName) {
    if (fileName.match(/\.json$/)) {
      const name = fileName.replace('.json', '');
      result[name] = require(`../../../back/list/${fileName}`);
    }
  });

  res.status(200).json(result);
};
