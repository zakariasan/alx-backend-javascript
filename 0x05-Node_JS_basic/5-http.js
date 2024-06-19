const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_FILE = process.argv[2] || '';

/**
 * Function to count students from a CSV file.
 * @param {string} dataPath - The path to the CSV file.
 * @returns {Promise<string>} - A formatted string with the student count and their fields.
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      return reject(new Error('Cannot load the database'));
    }

    const reportParts = [];
    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
      const field = studentRecord[studentRecord.length - 1];

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      const studentEntries = studentPropNames.map((propName, idx) => [
        propName,
        studentPropValues[idx],
      ]);
      studentGroups[field].push(Object.fromEntries(studentEntries));
    }

    const totalStudents = Object.values(studentGroups).reduce((pre, cur) => pre + cur.length, 0);
    reportParts.push(`Number of students: ${totalStudents}`);
    for (const [field, group] of Object.entries(studentGroups)) {
      reportParts.push(`Number of students in ${field}: ${group.length}. List: ${group.map(student => student.firstname).join(', ')}`);
    }
    resolve(reportParts.join('\n'));
  });
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler: (_, res) => {
      const responseText = 'Hello Holberton School!';
      res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(responseText),
      });
      res.end(responseText);
    },
  },
  {
    route: '/students',
    handler: (_, res) => {
      const responseParts = ['This is the list of our students'];

      countStudents(DB_FILE)
        .then((report) => {
          responseParts.push(report);
          const responseText = responseParts.join('\n');
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(responseText),
          });
          res.end(responseText);
        })
        .catch((err) => {
          responseParts.push(err.message);
          const responseText = responseParts.join('\n');
          res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(responseText),
          });
          res.end(responseText);
        });
    },
  },
];

app.on('request', (req, res) => {
  const handler = SERVER_ROUTE_HANDLERS.find(routeHandler => routeHandler.route === req.url)?.handler;
  if (handler) {
    handler(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = app;

