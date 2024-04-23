export default function createReportObject(employeesList) {
    const allEmp = {};

    for (const depart in employeesList) {
        allEmp[depart] = employeesList[depart];
    }

    return {
        allEmp,
        getnbr() {
            return Object.keys(allEmp).length
        }
    }

}
