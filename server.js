const http = require('http');
const public = require('./routes/public');

http.createServer((req, res) => {
  public(req, res);
}).listen(8080, () => console.log('Server is working now'));
