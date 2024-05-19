import {
  Building,
  Pricing,
  Currency,
  HolbertonCourse,
  ClassRoom,
  initializeRooms,
} from "./testing.js";

const b = new Building(100);
console.log(b);

class TestBuilding extends Building {}

try {
    new TestBuilding(200)
}
catch(err) {
    console.log(err);
}
