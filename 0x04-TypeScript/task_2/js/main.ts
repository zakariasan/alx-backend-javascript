interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

class Director implements DirectorInterface {
  workFromHome = (): string => "Working from home";
  getCoffeeBreak = (): string => "Getting a coffee break";
  workDirectorTasks = (): string => "Getting to director tasks";
}

class Teacher implements TeacherInterface {
  workFromHome = (): string => "Working from home";
  getCoffeeBreak = (): string => "Getting a coffee break";
  workTeacherTasks = (): string => "Getting to work";
}

function createEmployee(salary: number | string): Director | Teacher {
  if (typeof salary === "number" && salary < 500) {
    return new Teacher();
  }
  return new Director();
}

console.log(createEmployee(200));
console.log(createEmployee(1000));
console.log(createEmployee("$500"));

function isDirector(employee: any): boolean {
  return employee instanceof Director;
}

function executeWork(employee: Director | Teacher) {
  if (employee instanceof Director) {
    console.log(employee.workDirectorTasks());
  } else {
    console.log(employee.workTeacherTasks());
  }
}

executeWork(createEmployee(200));
executeWork(createEmployee(1000));

type Subjects = "Math" | "History";

function teachClass(todayClass: Subjects) {
  console.log(`Teaching ${todayClass}`);
}
teachClass('Math');
teachClass('History');
