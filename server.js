const http = require('http');

const public = require('./routes/public');
const home = require('./routes/home');

http.createServer((req, res) => {
  if (req.url.match(/.(html|css|js|png)$/)) {
    public(req, res);
  } else if (req.url === '/') {
    home(req, res);
  } else {

  }
}).listen(8080, () => console.log('Server is working now'));