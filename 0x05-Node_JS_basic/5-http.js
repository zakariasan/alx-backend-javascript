const http = require('http');
const fs = require('fs');
const path = require('path');

const countStudents = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(new Error('Cannot load the database'));
                return;
            }

            const lines = data.split('\n').filter(line => line.trim() !== '');
            const students = lines.slice(1).map(line => line.split(','));

            const fields = {};
            for (const student of students) {
                const field = student[3];
                if (!fields[field]) fields[field] = [];
                fields[field].push(student[0]);
            }

            let output = `Number of students: ${students.length}\n`;
            for (const field in fields) {
                output += `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}\n`;
            }
            resolve(output.trim());
        });
    });
};

const app = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello Holberton School!');
    } else if (req.url === '/students') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        const databasePath = process.argv[2];
        countStudents(databasePath)
            .then(data => {
                res.end(`This is the list of our students\n${data}`);
            })
            .catch(err => {
                res.end(err.message);
            });
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const PORT = 1245;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
