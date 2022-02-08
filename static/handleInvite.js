const handleInvite = () => {
  if (
    localStorage.getItem("flag") == null ||
    localStorage.getItem("flag") == "null"
  ) {
    console.log("run");
    localStorage.setItem("flag", "false");
  }
  if (sessionStorage.getItem("pair")) {
    const params = new URLSearchParams(window.location.search);
    if (params.has("code")) {
      let inviteCode = params.get("code");
      gun.user(params.get("code")).once((d) => {
        if (d == undefined) {
          gun.user(params.get("code")).once((d) => {
            if (localStorage.getItem("flag") == "false") {
              setTimeout(() => {
                localStorage.setItem("flag", "true");
                window.location.reload();
              }, 5000);
            } else {
              localStorage.setItem("flag", "null");
              console.log("User Does not exits!");
            }
          });
        } else {
          localStorage.setItem("code", JSON.stringify(inviteCode));
          localStorage.setItem("flag_1", "true");
          window.location.replace(
            `${window.location.origin}/D-Chat/index.html`
          );
        }
      });
    } else {
      window.location.replace(`${window.location.origin}/D-Chat/index.html`);
    }
  } else {
    window.location.replace(`${window.location.origin}/D-Chat/index.html`);
  }
};

handleInvite();
