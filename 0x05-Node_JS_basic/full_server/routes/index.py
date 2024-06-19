import AppC from '../controllers/AppController'
import StudentsC from '../controllers/StudentsController'


const mapRoutes = (app) = > {
    app.get('/', AppC.getHomepage)
    app.get('/students', StudentsC.getAllStudents)
    app.get('/students/:major', StudentsC.getAllStudentsByMajor)
}

export default mapRoutes
module.exports = mapRoutes
