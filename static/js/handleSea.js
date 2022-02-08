handleEnSea = async (pair, data) => {
  let enc = await SEA.encrypt(data, pair);
  // console.log(enc)
  return enc;
};

handleDeSea = async (pair, data) => {
  var dec = await SEA.decrypt(data, pair);
  // console.log(dec)
  return dec;
};
