const handleAutoLogin = () => {
  let localPair = JSON.parse(localStorage.getItem("localPair"));
  let pair = JSON.parse(sessionStorage.getItem("pair"));
  if (localPair || pair) {
    console.log();
    sessionStorage.setItem("recall", true);
    localPair = JSON.stringify(localPair);
    sessionStorage.setItem("localPair", localPair);
    if (user.is && window.location.pathname == "/D-Chat/signin.html") {
      window.location.replace(`${window.location.origin}/D-Chat/chat.html`);
    } else if (user.is && window.location.pathname == "/D-Chat/index.html") {
      window.location.replace(`${window.location.origin}/D-Chat/chat.html`);
    } else if (
      user.is == undefined &&
      window.location.pathname == "/D-Chat/index.html"
    ) {
      window.location.replace(`${window.location.origin}/D-Chat/signin.html`);
    }
  } else if (
    user.is == undefined &&
    window.location.pathname == "/D-Chat/chat.html"
  ) {
    window.location.replace(`${window.location.origin}/D-Chat/signin.html`);
  }
};
handleAutoLogin();
