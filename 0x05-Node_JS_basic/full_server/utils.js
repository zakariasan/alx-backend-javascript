import fs from 'fs/promises';

/**
 * Reads the data of students in a CSV data file.
 * @param {string} filePath - The path to the database file.
 * @returns {Promise<object>} - A promise that resolves to an object of arrays of student first names per field.
 */
const readDatabase = async (filePath) => {
  if (!filePath) {
    throw new Error('Cannot load the database');
  }

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const fields = headers.slice(0, -1);
    const groups = {};

    for (const line of lines.slice(1)) {
      const values = line.split(',');
      const student = values.slice(0, -1);
      const field = values[values.length - 1];

      if (!groups[field]) {
        groups[field] = [];
      }

      const studentEntry = fields.reduce((acc, field, index) => {
        acc[field] = student[index];
        return acc;
      }, {});

      groups[field].push(studentEntry);
    }

    const result = {};
    for (const [field, students] of Object.entries(groups)) {
      result[field] = students.map(student => student.firstname);
    }

    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

export default readDatabase;

