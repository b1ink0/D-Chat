const handleEnJSEncrypt = (key, data) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  let enc = encrypt.encrypt(data);
  return enc;
};

const handleDeJSEncrypt = (key, data) => {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(key);
  var uncrypted = decrypt.decrypt(data);
  return uncrypted;
};
