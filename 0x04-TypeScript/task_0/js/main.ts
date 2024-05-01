interface Student {
  firstName: string;
  lastNmae: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Zakaria',
  lastNmae: 'Haouzan',
  age:28,
  location: 'Ouarzazate'
};

const student2: Student = {
  firstName: 'Ouissal',
  lastNmae: 'Abekhti',
  age:25,
  location: 'Marrakech'
};

const studentsList: Student[] = [student1, student2];

function renderTable() {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  studentsList.forEach((stu) => {
    const row = document.createElement('tr');
    const fName = document.createElement('td');
    const location = document.createElement('td');

    fName.textContent = stu.firstName;
    location.textContent = stu.location;
    row.appendChild(fName);
    row.appendChild(location);
    tbody.appendChild(row);
  });
  table.append(tbody);
  document.body.appendChild(table);
}
renderTable();
