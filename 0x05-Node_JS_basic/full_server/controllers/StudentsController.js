import readDatabase from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentGroups = await readDatabase(req.dataPath);

      const responseParts = ['This is the list of our students'];

      // A comparison function for ordering a list of strings in ascending
      // order by alphabetic order and case insensitive
      const cmpFxn = (a, b) => {
        if (a[0].toLowerCase() < b[0].toLowerCase()) {
          return -1;
        }
        if (a[0].toLowerCase() > b[0].toLowerCase()) {
          return 1;
        }
        return 0;
      };

      for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
        responseParts.push([
          `Number of students in ${field}: ${group.length}.`,
          'List:',
          group.map((student) => student.firstname).join(', '),
        ].join(' '));
      }
      
      res.status(200).send(responseParts.join('\n'));
    } catch (err) {
      console.error(err);
      res.status(500).send(err instanceof Error ? err.message : err.toString());
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params;

      if (!['CS', 'SWE'].includes(major)) {
        res.status(500).send('Major parameter must be CS or SWE');
        return;
      }

      const studentGroups = await readDatabase(req.dataPath);

      let responseText = '';

      if (Object.keys(studentGroups).includes(major)) {
        const group = studentGroups[major];
        responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
      }

      res.status(200).send(responseText);
    } catch (err) {
      console.error(err);
      res.status(500).send(err instanceof Error ? err.message : err.toString());
    }
  }
}

export default StudentsController;
