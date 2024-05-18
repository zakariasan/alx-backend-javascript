class ClassRoom {
  constructor(maxStudentsSize) {
    this._maxStudentsSize = maxStudentsSize
  }
}

export default function initializeRooms() {
  return [new ClassRoom(19), new ClassRoom(20), new ClassRoom(34)]
}

class HolbertonCourse {
  constructor(name, length, students) {
    this._name = name;
    this._length = length;
    this._students = students;
  }

  get name () {
    return this._name;
  }
  set name (value) {
    if (typeof value === 'string') {
      this._name = value;
    }
  }
  
  get length () {
    return this._length;
  }
  set length (value) {
    if (typeof value === 'number') {
      this._length = value;
    }
  }

  get students () {
    return this._students;
  }
  set students (value) {
    if (Array.isArray(value)) {
      for item in value:
        if (typeof item !== 'string') {
        throw new Error
      }

      this._name = value;
    }
  }

}


export { ClassRoom, initializeRooms };
