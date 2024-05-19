export default class Airport {
  constructor(name, code) {
    this._name = name;
    this._code = code;
  }

  get name() {
    return this._name;
  }

  get code() {
    return this._code;
  }

  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }

    this._name = value;
  }

  set code(value) {
    if (typeof code !== 'string') {
      throw new TypeError('Code must be a string');
    }
    this._code = value;
  }

  get [Symbol.toStringTag]() {
    return this._code;
  }
}
