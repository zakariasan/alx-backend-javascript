const express = require('express');
const fs = require('fs').promises;

const app = express();
const PORT = 1245;

const countStudents = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '').slice(1);
    const fields = {};
    let totalStudents = 0;

    lines.forEach((line) => {
      const [firstname, , , field] = line.split(',');
      if (field) {
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
        totalStudents += 1;
      }
    });

    let output = `Number of students: ${totalStudents}\n`;
    for (const [field, students] of Object.entries(fields)) {
      output += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
    }
    return output.trim();
  } catch (err) {
    throw new Error('Cannot load the database');
  }
};

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const filePath = process.argv[2];
  if (!filePath) {
    res.send('This is the list of our students\nCannot load the database');
    return;
  }

  try {
    const studentsInfo = await countStudents(filePath);
    res.send(`This is the list of our students\n${studentsInfo}`);
  } catch (err) {
    res.send(`This is the list of our students\n${err.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
