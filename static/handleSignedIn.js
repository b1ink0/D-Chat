const handleSignedIn = () => {
  if (user.is) {
    console.log("auth");
    sign = true;
    $("#sign").hide();
    $("#btns").show();
    $("#chat").show();
    userData = JSON.parse(sessionStorage.getItem("pair"));
    localStorage.setItem("localPair", JSON.stringify(userData));
    gun.user(userData.pub).once(() => {
      gun.user(userData.pub).once((data) => {
        myUsername = data.alias;
        $("#username").append(`<h3>Username: ${myUsername}</h3>`);
      });
    });
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
          let t = ensea(userData, private);
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
