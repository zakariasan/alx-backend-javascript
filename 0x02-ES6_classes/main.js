import {
  Pricing,
  Currency,
  HolbertonCourse,
  ClassRoom,
  initializeRooms,
} from "./testing.js";

const p = new Pricing(100, new Currency("EUR", "Euro"))
console.log(p);
console.log(p.displayFullPrice());
