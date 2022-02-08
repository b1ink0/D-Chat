const handleCopyInviteLink = () => {
  let t = `${window.location.origin}/D-Chat/invite.html?code=${
    JSON.parse(sessionStorage.getItem("pair")).pub
  }`;
  var input = document.createElement("input");
  input.setAttribute("value", t);
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand("copy");
  document.body.removeChild(input);
  alert("Copied!");
  return result;
};
