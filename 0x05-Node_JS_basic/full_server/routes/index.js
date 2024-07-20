import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';


const mapRout = (app) => {
  app.get('/', AppController.getHomepage);
  app.get('/students', StudentsController.getAllStudents);
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

export default mapRout;
module.exports = mapRout;
