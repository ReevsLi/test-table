/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('request');

module.exports = function (app) {
  app.use('/v2/*', (req, res) => {
    const url = `https://api-pub.bitfinex.com/${req.originalUrl}`;
    req.pipe(request(url)).pipe(res);
  });
};
