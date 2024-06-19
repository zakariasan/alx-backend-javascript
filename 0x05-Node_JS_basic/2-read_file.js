const fs = require('fs');

function countStudents(path) {
  try {
    // Read the CSV file synchronously
    const data = fs.readFileSync(path, 'utf-8');
    // Split the data into lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    // Check if the file has content
    if (lines.length <= 1) {
      throw new Error('Cannot load the database');
    }

    // Remove the header line
    const header = lines.shift();

    // Initialize student count and field-based collections
    const fieldCounts = {};
    const students = {};

    // Process each line
    lines.forEach((line) => {
      const [firstname, lastname, age, field] = line.split(',');
      if (!field) return;

      if (!fieldCounts[field]) {
        fieldCounts[field] = 0;
        students[field] = [];
      }
      fieldCounts[field] += 1;
      students[field].push(firstname);
    });

    // Calculate total number of students
    const totalStudents = lines.length;

    // Log total number of students
    console.log(`Number of students: ${totalStudents}`);

    // Log number of students and list by field
    for (const field in fieldCounts) {
      if (Object.hasOwnProperty.call(fieldCounts, field)) {
        const count = fieldCounts[field];
        const names = students[field].join(', ');
        console.log(`Number of students in ${field}: ${count}. List: ${names}`);
      }
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

