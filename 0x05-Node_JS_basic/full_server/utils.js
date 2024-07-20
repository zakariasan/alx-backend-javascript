/**
 * Reads the data of students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Yahya Oulha <https://github.com/yo-aiv1>
 * @returns {Promise<{
 *   String: {firstname: String, lastname: String, age: number}[]
 * }>}
 */
import fs from 'fs/promises';

export default function readDatabase(filePath) {
  return fs.readFile(filePath, 'utf-8')
    .then((data) => {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      const result = {};
      lines.forEach((line) => {
        const [firstName, field] = line.split(',');
        if (!result[field]) {
          result[field] = [];
        }
        result[field].push(firstName);
      });
      return result;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
module.exports = readDatabase;
