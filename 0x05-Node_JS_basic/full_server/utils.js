import fs from 'fs';

/**
 * Reads the database asynchronously.
 * @param {string} filePath - The path to the CSV database file.
 * @returns {Promise<object>} A promise resolving to an object of arrays of first names per fields.
 */
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('File path is missing.'));
    return;
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error(`Cannot read database file: ${err.message}`));
      return;
    }

    const lines = data.trim().split('\n');
    const fieldNames = lines[0].split(',');
    const students = {};

    // Initialize student groups for each field
    fieldNames.forEach((fieldName, index) => {
      if (index < fieldNames.length - 1) {
        students[fieldName] = [];
      }
    });

    // Parse each line and add student first names to respective fields
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].split(',');
      const firstName = line[0].trim();
      const field = line[line.length - 1].trim();

      if (students[field]) {
        students[field].push(firstName);
      }
    }

    resolve(students);
  });
});

export default readDatabase;
