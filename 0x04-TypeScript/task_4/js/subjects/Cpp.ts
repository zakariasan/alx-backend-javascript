/// <reference path='Teacher.ts'/>
/// <reference path='Subject.ts'/>

namespace Subjects {
  export interface Teacher {
    experienceTeachingC?: number;
  }
  export class Cpp extends Subject {
    getRequirements = (): string => "Here is the list of requirements for Cpp";
    getAvailableTeacher = (teacher: Teacher): string => {
      if (teacher?.experienceTeachingC) {
        return "No available teacher";
      }

      return `Available Teacher: ${this.teacher.firstName}`;
    };
  }
}
