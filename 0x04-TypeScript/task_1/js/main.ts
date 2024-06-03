interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullTimeEmployee: boolean;
  readonly yearsOfExperience?: number;
  readonly location: string;
  [key: string]: any; // Allow any other attribute
}

class TeacherImpl implements Teacher {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullTimeEmployee: boolean;
  readonly yearsOfExperience?: number;
  readonly location: string;
  [key: string]: any;

  constructor(
    firstName: string,
    lastName: string,
    fullTimeEmployee: boolean,
    location: string,
    otherAttributes: any,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullTimeEmployee = fullTimeEmployee;
    this.location = location;
    Object.assign(this, otherAttributes);
  }
}

const teacher3: Teacher = new TeacherImpl("John", "Doe", false, "London", {
  contract: false,
});

console.log(teacher3);

interface Directors extends Teacher {
  numberOfReports: number;
}

const director1: Directors = {
  firstName: "John",
  lastName: "Doe",
  location: "London",
  fullTimeEmployee: true,
  numberOfReports: 17,
};

console.log(director1);

interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}
const printTeacher: printTeacherFunction = (firstName, lastName) => {
  return `${firstName[0]}. ${lastName}`;
};

interface Student {
  firstName: string;
  lastName: string;
}

class StudentClass {
  firstName: string;
  lastName: string;
  constructor(firstName: string, lastName: string) {
    firstName = this.firstName;
    lastName = this.lastName;
  }
  workOnHomework(): string {
    return "Currently working";
  }
  displayName(): string{
    return `${this.firstName}`;
  }
}
