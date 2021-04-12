// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  const { name } = req.query
  let result = require(`../../../../back/list/${name}.json`);

  res.status(200).json(result);
}
