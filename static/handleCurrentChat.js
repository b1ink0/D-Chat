const handleCurrentChat = (publicKey, un, pk = "", flag = false) => {
  if (user.is) {
    let pubKey = handleCodeGen(publicKey);
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
                gun.get(handleCodeGen(publicKey)).once(() => {
                  gun.get(handleCodeGen(publicKey)).once((doc) => {
                    Object.keys(doc).forEach((key) => {
                      if (key == un) {
                        let div = document.createElement(key);
                        $("#list").html(
                          `<div id="${key}"><h3>${key} - Started The Chat!</h3><ul></ul><form id="f${key}"><input id="i${key}" type="text" placeholder="Type Message..." required/><input type="submit" value="send"/></form></div>`
                        );
                        $(`#f${key}`).on("submit", function (e) {
                          e.preventDefault();
                          temp = gun.get(pubKey).get(un).get("sent");
                          let r = handleEnJSEncrypt(
                            keys.pub,
                            `${$(`#i${key}`).val()}`
                          );
                          let s = handleEnJSEncrypt(
                            k.pub,
                            `${$(`#i${key}`).val()}`
                          );
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
                            let message = handleDeJSEncrypt(keys.pri, temp.r);
                            if (!message) {
                              message = handleDeJSEncrypt(keys.pri, temp.s);
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
