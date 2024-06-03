/// <reference path="./subjects/Teacher.ts" />
/// <reference path="./subjects/Subject.ts" />
/// <reference path="./subjects/Cpp.ts" />


const cTeacher: Subjects.Teacher = {
  firstName: "zak",
  lastName: "Haouzan",
  experienceTeachingC: 10,
};

const cpp: Subjects.Cpp = new Subjects.Cpp();

console.log("C++");
console.log(cTeacher);
console.log(cpp);
