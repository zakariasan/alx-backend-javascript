class Currency {
  constructor(code, name) {
    this._code = code;
    this._name = name;
  }

  get code() {
    return this._code;
  }
  get name() {
    return this._name;
  }

  set code(value) {
    if (!typeof value !== "string") {
      throw new TypeError("Code must be a string");
    }
    this._code = value;
  }

  set name(value) {
    if (!typeof value !== "string") {
      throw new TypeError("Name must be a string");
    }
    this._name = value;
  }

  displayFullCurrency() {
    return `${this._name} (${this._code})`;
  }
}

class ClassRoom {
  constructor(maxStudentsSize) {
    this._maxStudentsSize = maxStudentsSize;
  }
}

function initializeRooms() {
  return [new ClassRoom(19), new ClassRoom(20), new ClassRoom(34)];
}

class HolbertonCourse {
  constructor(name, length, students) {
    this._name = name;
    this._length = length;
    this._students = students;
  }

  get name() {
    return this._name;
  }
  set name(value) {
    if (typeof value !== "string") {
      throw new TypeError("Name must be a string");
    }
    this._name = value;
  }

  get length() {
    return this._length;
  }
  set length(value) {
    if (typeof value !== "number") {
      throw new TypeError("Length must be a number");
    }
    this._length = value;
  }

  get students() {
    return this._students;
  }
  set students(value) {
    if (!Array.isArray(value)) {
      if (!value.every((item) => typeof item !== "string")) {
        throw new TypeError("Students must be an array of strings");
      }
    }
    this._name = value;
  }
}

export { Currency, HolbertonCourse, ClassRoom, initializeRooms };
