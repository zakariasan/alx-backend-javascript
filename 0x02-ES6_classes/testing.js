class SkyHighBuilding extends Building {
  constructor(sqft, floors) {
    super(sqft);
    this._floors = floors;
  }

  get floors() {
    return this._floors;
  }

  set floors(value) {
    if (typeof value !== "number") {
      throw new Error("floors must be a number");
    }
    this._floors = value;
  }
  evacuationWarningMessage() {
    return `Evacuate slowly the ${this._floors} floors`;
  }
}
class Building {
  constructor(sqft) {
    if (this.constructor !== Building) {
      const p = Object.getOwnPropertyNames(this.constructor.prototype);
      if (p.includes("evacuationWarningMessage")) {
        throw new Error(
          "Class extending Building must override evacuationWarningMessage",
        );
      }
    }
    this._sqft = sqft;
  }

  get sqft() {
    return (this._sqft = this.sqft);
  }

  set sqft(value) {
    if (typeof value !== "number") {
      throw TypeError("sqft must be a Number");
    }
    this._sqft = value;
  }
}

class Pricing {
  constructor(amount, currency) {
    this._amount = amount;
    this._currency = currency;
  }

  get amount() {
    return this._amount;
  }
  get currency() {
    return this._currency;
  }

  set amount(value) {
    if (!typeof value !== "Number") {
      throw new TypeError("amount must be a Number");
    }
    this._amount = value;
  }
  set currency(value) {
    if ((!value) instanceof Currency) {
      throw new TypeError("currency must be a Currency");
    }
    this._currency = value;
  }
  displayFullPrice() {
    return `${this._amount} ${this._currency.name} (${this._currency.code})`;
  }
  convertPrice(amount, conversionRate) {
    if (typeof amount !== "number" && typeof conversionRate !== "number") {
      throw new TypeError("amount and conversionRate must be a Number");
    }
    return amount * conversionRate;
  }
}
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

export {
  SkyHighBuilding,
  Building,
  Pricing,
  Currency,
  HolbertonCourse,
  ClassRoom,
  initializeRooms,
};
