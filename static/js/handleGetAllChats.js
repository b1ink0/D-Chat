const handleGetAllChats = () => {
  let userData = JSON.parse(sessionStorage.getItem("pair"));
  $("#chats").html("");
  user.get("chat").once(() => {
    user.get("chat").once((n) => {
      try {
        Object.values(n).forEach((m) => {
          mn = JSON.stringify(m);
          if (mn.slice(1, 3) == "{\\") {
            let t = handleDeSea(userData, JSON.parse(m).pub);
            t.then((k) => {
              gun.user(k).once(() => {
                gun.user(k).once((l) => {
                  $("#chats").append(
                    `<button type="button" onclick='handleCurrentChat("${k}", "${myUsername}")'>S: ${l.alias}</button>`
                  );
                });
              });
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  let pubCode = handleCodeGen(userData.pub);
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
                        `<button type="button" onclick='handleCurrentChat("${
                          userData.pub
                        }", "${m}", "${
                          JSON.parse(l).pkey
                        }", true)'>R: ${m}</button>`
                      );
                      gun.get(pubCode).off();
                    }
                  });
                });
            });
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  handleGetAllChats();
});
