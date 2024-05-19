export default class Building {
  constructor(sqft) {
    if (this.constructor !== Building) {
      const ouissal = Object.getOwnPropertyNames(this.constructor.prototype);
      if (!ouissal.includes('evacuationWarningMessage')) {
        throw new Error(
          'Class extending Building must override evacuationWarningMessage',
        );
      }
    }
    this._sqft = sqft;
  }

  get sqft() {
    return this._sqft;
  }

  set sqft(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError('Sqft must be a number');
    }
    this._sqft = value;
  }
}
