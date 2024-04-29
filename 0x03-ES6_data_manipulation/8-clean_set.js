const cleanSet = (set, startString) => {
  if (startString === '' || typeof startString !== 'string') {
    return '';
  }

  const strings = [...set]
    .filter((s) => typeof s === 'string' && s.startsWith(startString))
    .map((s) => s.slice(startString.length));

  return strings.join('-');
};

export default cleanSet;
