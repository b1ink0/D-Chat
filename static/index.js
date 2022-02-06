let SEA = Gun.SEA;
let sign = false;
let pkey = "";
let userData;
let myUsername = "";
let keys;

const getCharCodes = (s) => {
  let charCodeArr = [];
  for (let i = 0; i < s.length; i++) {
    let code = s.charCodeAt(i);
    charCodeArr.push(code);
  }
  charCodeArr.reduce((a, b) => a + b, 0);
  return charCodeArr;
};
const code = (s) => {
  let sum = getCharCodes(s).reduce((a, b) => a + b, 0);
  sum = sum.toString();
  sum = "Z" + sum;
  return sum;
};
const en = (key, data) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  let enc = encrypt.encrypt(data);
  return enc;
};
const ensea = async (pair, data) => {
  let enc = await SEA.encrypt(data, pair);
  // console.log(enc)
  return enc;
};
const desea = async (pair, data) => {
  var dec = await SEA.decrypt(data, pair);
  // console.log(dec)
  return dec;
};

const de = (key, data) => {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(key);
  var uncrypted = decrypt.decrypt(data);
  return uncrypted;
};
const copyPublicKey = () => {
  let t = `${window.location.origin}/test/invite.html?code=${userData.pub}`;
  var input = document.createElement("input");
  input.setAttribute("value", t);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand("copy");
  document.body.removeChild(input);
  alert("Copied!");
  return result;
};

const gun = Gun([
  //  "http://localhost:8000/gun",
  "https://gun-server-1.herokuapp.com/gun",
]);

const user = gun.user();
user.recall({ sessionStorage: true });

const getAllData = () => {
  $("#chats").html("");
  user.get("chat").once(() => {
    user.get("chat").once((n) => {
      Object.values(n).forEach((m) => {
        mn = JSON.stringify(m);
        if (mn.slice(1, 3) == "{\\") {
          let t = desea(userData, JSON.parse(m).pub);
          t.then((k) => {
            gun.user(k).once(() => {
              gun.user(k).once((l) => {
                $("#chats").append(
                  `<button type="button" onclick='sentMessageDisplay("${k}", "${myUsername}")'>S: ${l.alias}</button>`
                );
              });
            });
          });
        }
      });
    });
  });
  let pubCode = code(userData.pub);
  gun.get(pubCode).once(() => {
    gun.get(pubCode).on((n) => {
      Object.keys(n).forEach((m) => {
        if (m != "_") {
          gun
            .get(pubCode)
            .get(m)
            .get("sent")
            .once(() => {
              gun
                .get(pubCode)
                .get(m)
                .get("sent")
                .once((k) => {
                  Object.values(k).forEach((l) => {
                    lk = JSON.stringify(l);
                    if (lk[4] == "p") {
                      $("#chats").append(
                        `<button type="button" onclick='sentMessageDisplay("${
                          userData.pub
                        }", "${m}", "${
                          JSON.parse(l).pkey
                        }", true)'>R: ${m}</button>`
                      );
                    }
                  });
                });
            });
        }
      });
    });
  });
};

$("#up").on("click", function (e) {
  gun.get(`~@${$("#alias").val()}`).once(() => {
    gun.get(`~@${$("#alias").val()}`).once((data) => {
      if (data == undefined) {
        $("#error").html("");
        user.create($("#alias").val(), $("#pass").val());
      } else {
        $("#error").html("<h4>Username Already Exist</h4>");
      }
    });
  });
});

$("#sign").on("submit", function (e) {
  e.preventDefault();

  user.auth($("#alias").val(), $("#pass").val(), (data) => {
    if (data.err) {
      user.auth($("#alias").val(), $("#pass").val(), (data) => {
        if (data.err) {
          user.auth($("#alias").val(), $("#pass").val());
        }
      });
    }
  });
});

gun.on("auth", function () {
  console.log("auth");
  sign = true;
  $("#sign").hide();
  $("#btns").show();
  $("#chat").show();
  userData = JSON.parse(sessionStorage.getItem("pair"));

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
        let t = desea(userData, data.pri);
        t.then((d) => {
          keys = {
            pri: d,
            pub: data.pub,
          };
          getAllData();
        });
      }
    });
  });
});

$("#chat").on("submit", function (e) {
  e.preventDefault();
  let pub = $("#request").val();
  console.log(pub);
  temp = gun.get(code(pub)).get(myUsername);
  let t = {
    pkey: userData.pub,
  };
  temp.get("sent").set(JSON.stringify(t));
  let t1 = ensea(userData, pub);
  t1.then((data) => {
    let t2 = {
      pub: data,
    };
    t2 = JSON.stringify(t2);
    user.get("chat").set(t2);
  });
});

const handleChat = (pub) => {
  console.log(pub);
  temp = gun.get(code(pub)).get(myUsername);
  let t = {
    pkey: userData.pub,
  };
  temp.get("sent").set(JSON.stringify(t));
  let t1 = ensea(userData, pub);
  t1.then((data) => {
    let t2 = {
      pub: data,
    };
    t2 = JSON.stringify(t2);
    user.get("chat").set(t2);
    setTimeout(() => {
      getAllData();
    }, 1000);
  });
};

const sentMessageDisplay = (publicKey, un, pk = "", flag = false) => {
  if (user.is) {
    let pubKey = code(publicKey);
    gun.user(publicKey).once(() => {
      gun.user(publicKey).once((data) => {
        let username = data.alias;
        gun
          .user(pk == "" ? publicKey : pk)
          .get("keys")
          .once(() => {
            gun
              .user(pk == "" ? publicKey : pk)
              .get("keys")
              .once((k) => {
                gun.get(code(publicKey)).once(() => {
                  gun.get(code(publicKey)).once((doc) => {
                    Object.keys(doc).forEach((key) => {
                      if (key == un) {
                        let div = document.createElement(key);
                        $("#list").html(
                          `<div id="${key}"><h3>${key} - Started The Chat!</h3><ul></ul><form id="f${key}"><input id="i${key}" type="text" placeholder="Type Message..." required/><input type="submit" value="send"/></form></div>`
                        );
                        $(`#f${key}`).on("submit", function (e) {
                          e.preventDefault();
                          temp = gun.get(pubKey).get(un).get("sent");
                          let r = en(keys.pub, `${$(`#i${key}`).val()}`);
                          let s = en(k.pub, `${$(`#i${key}`).val()}`);
                          let t = {
                            s: s,
                            r: r,
                          };
                          temp.set(JSON.stringify(t));
                          $(`#i${key}`).val("");
                        });
                        let t = gun.get(pubKey).get(key).get("sent");
                        t.map().once((data) => {
                          let temp = JSON.parse(data);
                          let send = true;
                          if (temp) {
                            let message = de(keys.pri, temp.r);
                            if (!message) {
                              message = de(keys.pri, temp.s);
                              send = false;
                            }
                            if (message) {
                              let li = document.createElement("li");
                              let text = document.createTextNode(
                                flag
                                  ? `${send ? username : un}: ${message}`
                                  : `${send ? un : username}: ${message}`
                              );
                              li.appendChild(text);
                              $(`#${key} ul`).append(li);
                            }
                          }
                        });
                      }
                    });
                  });
                });
              });
          });
      });
    });
  } else {
    console.log("Enter Public Key");
  }
};

console.log(window.location.href);

if (localStorage.getItem("flag_1") == "true") {
  if (localStorage.getItem("code")) {
    setTimeout(() => {
      handleChat(JSON.parse(localStorage.getItem("code")));
      localStorage.removeItem("code");
      localStorage.removeItem("flag_1");
      localStorage.removeItem("flag");
    }, 2000);
  }
}
