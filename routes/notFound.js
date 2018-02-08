const fs = require('fs');
const path = require('path');

function notFound(req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');

  const stream = fs.createReadStream('./public/error.html'); // also can be path.resolve('public', index.html); for absolute path

  stream.pipe(res);

  stream.on('error', error => {
    if (error.code === 'ENOENT') {
      console.error(error);

      res.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      res.end('Not found');
    } else {
      console.error(error);

      res.writeHead(500, {
        'Content-Type': 'text/plain'
      });

      res.end(error.message);
    }
  });
}

module.exports = notFound;