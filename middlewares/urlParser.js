const { parse, URL, URLSearchParams } = require('url')

const urlParser = (req, res) => {
  let path = req.url;
  let params = "";
  if (req.url.match(/\d+/g)) {
    params = req.url.slice(req.url.lastIndexOf("/") + 1, req.url.length);
    path = req.url.slice(0, req.url.lastIndexOf("/") + 1);
  }
  req.params = params;
  req.pathname = path;
};
module.exports = { urlParser }