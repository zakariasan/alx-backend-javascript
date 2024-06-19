const http = require('http');
const { countStudents } = require('./3-read_file_async');
const fs = require('fs');

const PORT = 1245;

const app = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (method === 'GET' && url === '/students') {
    const databasePath = process.argv.length > 2 ? process.argv[2] : '';
    countStudents(databasePath)
      .then((report) => {
        const responseText = [
          'This is the list of our students',
          report
        ].join('\n');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(responseText);
      })
      .catch((err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(err instanceof Error ? err.message : err.toString());
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Error</title></head><body><pre>Cannot GET ' + url + '</pre></body></html>');
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

module.exports = app;
