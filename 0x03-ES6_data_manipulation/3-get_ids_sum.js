function getStudentIdsSum(obj, city) {
  if (!(typeof obj === 'object')) {
    return [];
  }
  return obj.reduce((acc, item) => acc + item.id, 0);
}
export default getStudentIdsSum;
