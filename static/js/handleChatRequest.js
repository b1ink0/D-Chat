const handleChatRequest = (pub) => {
  let userData = JSON.parse(sessionStorage.getItem("pair"));
  console.log(pub);
  user.get("chat").once((chatArray) => {
    let chats = Object.values(chatArray);
    if (chats) {
      let pubKeyArray = [];
      let count = 1;
      chats.forEach((chat) => {
        let tempChat = JSON.stringify(chat);
        if (tempChat.slice(1, 3) == "{\\") {
          let decryptedPubKey = handleDeSea(userData, JSON.parse(chat).pub);
          decryptedPubKey.then((pubKey) => {
            count++;
            if (count == chats.length) {
              if (!pubKeyArray.includes(pub)) {
                temp = gun.get(handleCodeGen(pub)).get(myUsername);
                let t = {
                  pkey: userData.pub,
                };
                temp.get("sent").set(JSON.stringify(t));
                let t1 = handleEnSea(userData, pub);
                t1.then((data) => {
                  let t2 = {
                    pub: data,
                  };
                  t2 = JSON.stringify(t2);
                  user.get("chat").set(t2);
                  setTimeout(() => {
                    handleGetAllChats();
                  }, 1000);
                });
              } else {
                console.log("Chat Already Exists!");
              }
            }
            pubKeyArray.push(pubKey);
          });
        }
      });
    }
  });
};

if (localStorage.getItem("flag_1") == "true") {
  console.log(localStorage.getItem("flag_1"));
  if (localStorage.getItem("code")) {
    setTimeout(() => {
      handleChatRequest(JSON.parse(localStorage.getItem("code")));
      localStorage.removeItem("code");
      localStorage.removeItem("flag_1");
      localStorage.removeItem("flag");
    }, 2000);
  }
}
