import fs from 'fs';

/**
 * Reads the data of students in a CSV data file.
 * @param {string} dataPath - Path to the CSV data file.
 * @returns {Promise<Object>} - Promise that resolves to an object containing arrays of students per field.
 */
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database: No file path provided.'));
    return;
  }

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      reject(new Error(`Cannot load the database: ${err.message}`));
      return;
    }

    const fileLines = data.trim().split('\n');
    const studentGroups = {};
    const dbFieldNames = fileLines[0].split(',');
    const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

    for (const line of fileLines.slice(1)) {
      const studentRecord = line.split(',');
      const studentProps = {};
      for (let i = 0; i < studentPropNames.length; i++) {
        studentProps[studentPropNames[i]] = studentRecord[i];
      }
      const field = studentRecord[studentRecord.length - 1];
      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }
      studentGroups[field].push(studentProps);
    }

    resolve(studentGroups);
  });
});

export default readDatabase;
