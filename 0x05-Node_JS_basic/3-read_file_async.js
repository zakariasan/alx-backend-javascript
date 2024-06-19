const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        if (lines.length <= 1) {
          reject(new Error('Cannot load the database'));
        }

        lines.shift(); // Remove the header line

        const fieldCounts = {};
        const students = {};

        lines.forEach((line) => {
          const [firstname, , , field] = line.split(',');
          if (!field) return;

          if (!fieldCounts[field]) {
            fieldCounts[field] = 0;
            students[field] = [];
          }
          fieldCounts[field] += 1;
          students[field].push(firstname);
        });

        const totalStudents = lines.length;

        console.log(`Number of students: ${totalStudents}`);
        for (const field in fieldCounts) {
          if (Object.hasOwnProperty.call(fieldCounts, field)) {
            const count = fieldCounts[field];
            const names = students[field].join(', ');
            console.log(`Number of students in ${field}: ${count}. List: ${names}`);
          }
        }
        resolve();
      }
    });
  });
}

module.exports = countStudents;
