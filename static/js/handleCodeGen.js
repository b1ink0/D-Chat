const getCharCodes = (s) => {
  let charCodeArr = [];
  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);
    charCodeArr.push(code);
  }
  charCodeArr.reduce((a, b) => a + b, 0);
  return charCodeArr;
};

handleCodeGen = (s) => {
  let sum = getCharCodes(s).reduce((a, b) => a + b, 0);
  sum = sum.toString();
  sum = "Z" + sum;
  return sum;
};
