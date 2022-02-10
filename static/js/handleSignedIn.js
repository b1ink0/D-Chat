const handleSignedIn = () => {
  if (user.is) {
    console.log("auth");
    sign = true;
    userData = JSON.parse(sessionStorage.getItem("pair"));
    localStorage.setItem("localPair", JSON.stringify(userData));
    user.get("keys").once(() => {
      user.get("keys").once((data) => {
        if (data == undefined) {
          let obj = new JSEncrypt({ default_key_size: 1024 });
          obj.getKey();
          let public = obj.getPublicKey();
          let private = obj.getPrivateKey();
          public = public.replace(/(\r\n|\n|\r)/gm, "");
          private = private.replace(/(\r\n|\n|\r)/gm, "");
          keys = {
            pub: public,
            pri: private,
          };
          let t = handleEnSea(userData, private);
          t.then((data) => {
            let temp = {
              pub: public,
              pri: data,
            };
            user.get("keys").put(temp);
          });
        } else {
          let t = handleDeSea(userData, data.pri);
          t.then((d) => {
            keys = {
              pri: d,
              pub: data.pub,
            };
            // getAllData();
          });
        }
      });
    });
  }
};

handleSignedIn();
