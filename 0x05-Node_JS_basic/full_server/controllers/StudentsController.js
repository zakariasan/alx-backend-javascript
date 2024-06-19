import readDatabase from '../utils';

const VALID_MAJORS = ['CS', 'SWE'];

/**
 * Contains route handlers.
 */
class StudentsController {
  static getAllStudents(request, response) {
    const databasePath = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(databasePath)
      .then((studentGroups) => {
        const responseBody = ['This is the list of our students'];
        
        const compareFields = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) return -1;
          if (a[0].toLowerCase() > b[0].toLowerCase()) return 1;
          return 0;
        };

        Object.entries(studentGroups)
          .sort(compareFields)
          .forEach(([field, group]) => {
            responseBody.push(
              `Number of students in ${field}: ${group.length}. List: ${group.map(student => student.firstname).join(', ')}`
            );
          });

        response.status(200).send(responseBody.join('\n'));
      })
      .catch((err) => {
        response.status(500).send(err instanceof Error ? err.message : err.toString());
      });
  }

  static getAllStudentsByMajor(request, response) {
    const databasePath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databasePath)
      .then((studentGroups) => {
        let responseText = '';

        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map(student => student.firstname).join(', ')}`;
        }

        response.status(200).send(responseText);
      })
      .catch((err) => {
        response.status(500).send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;

