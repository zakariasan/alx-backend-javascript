import createIteratorObject from "./100-createIteratorObject.js";

import createEmployeesObject from './11-createEmployeesObject.js';
import createReportObject from './12-createReportObject.js';

const employees = {
    ...createEmployeesObject('engineering', ['Bob', 'Jane']),
    ...createEmployeesObject('marketing', ['Sylvie'])
};

const report = createReportObject(employees);
createIteratorObject(report)
const reportWithIterator = createIteratorObject(report);

console.log("--------------main redult--------")
for (const item of reportWithIterator) {
    console.log(item);
}

