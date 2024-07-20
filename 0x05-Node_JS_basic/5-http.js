const http = require('http');
const fs = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const server = http.createServer();
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

const readStudentData = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }
  if (filePath) {
    fs.readFile(filePath, (error, fileData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (fileData) {
        const output = [];
        const lines = fileData.toString('utf-8').trim().split('\n');
        const studentClasses = {};
        const headers = lines[0].split(',');
        const studentAttributes = headers.slice(0, headers.length - 1);

        for (const line of lines.slice(1)) {
          const studentDetails = line.split(',');
          const studentInfo = studentDetails.slice(0, studentDetails.length - 1);
          const studentClass = studentDetails[studentDetails.length - 1];
          if (!Object.keys(studentClasses).includes(studentClass)) {
            studentClasses[studentClass] = [];
          }
          const studentEntries = studentAttributes.map((attribute, index) => [
            attribute,
            studentInfo[index],
          ]);
          studentClasses[studentClass].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentClasses).reduce(
          (prev, curr) => (prev || []).length + curr.length,
        );
        output.push(`Number of students: ${totalStudents}`);
        for (const [studentClass, students] of Object.entries(studentClasses)) {
          output.push([
            `Number of students in ${studentClass}: ${students.length}.`,
            'List:',
            students.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(output.join('\n'));
      }
    });
  }
});

const ROUTE_HANDLERS = [
  {
    path: '/',
    handler(_, response) {
      const message = 'Hello Holberton School!';

      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', message.length);
      response.statusCode = 200;
      response.write(Buffer.from(message));
    },
  },
  {
    path: '/students',
    handler(_, response) {
      const output = ['This is the list of our students'];

      readStudentData(DATABASE_FILE)
        .then((report) => {
          output.push(report);
          const message = output.join('\n');
          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', message.length);
          response.statusCode = 200;
          response.write(Buffer.from(message));
        })
        .catch((err) => {
          output.push(err instanceof Error ? err.message : err.toString());
          const message = output.join('\n');
          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', message.length);
          response.statusCode = 200;
          response.write(Buffer.from(message));
        });
    },
  },
];

server.on('request', (req, res) => {
  for (const routeHandler of ROUTE_HANDLERS) {
    if (routeHandler.path === req.url) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = server;
