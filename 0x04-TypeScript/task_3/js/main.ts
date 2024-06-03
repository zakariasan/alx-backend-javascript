/// <reference path="./crud.d.ts"/>
import { RowID, RowElement } from "./interface";
import * as CRUD from "./crud.js";

let row: RowElement = {
  firstName: "Guillaume",
  lastName: "Salva",
};

const newRowID: RowID = CRUD.insertRow(row);
row.age = 23;
const updatwRow: RowElement = row;

CRUD.updateRow(newRowID, updatwRow);
CRUD.deleteRow(newRowID);
