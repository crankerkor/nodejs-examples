const fs = require('fs');
const path = require('path');

function public(req, res){
  const extension = path.extname(req.url); // .ext
  let contentType = '';

  switch (extension) {
    case '.html':
      contentType = 'text/html';
      break;

    case '.png':
      contentType = 'image/png';
      break;
      
    default:
      contentType = 'text/plain';
  }

  //res.writeHead(200, { 'Content-Type' : contentType });
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);

  const stream = fs.createReadStream(path.join(__dirname, '..', req.url));

  stream.pipe(res);
  stream.on('error', error => {
    if (error.code === 'ENOENT') {
      console.error(error);
      res.writeHead(404, { 'Content-Type' : 'text/plain' });
      res.end('Not found');
    } else {
      console.error(error);
      res.writeHead(500, { 'Content-Type' : 'text/plain' });
      res.end(error.message);
    }
  });
}

module.exports = public;
