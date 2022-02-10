$("#up").on("click", function (e) {
  gun.get(`~@${$("#alias").val()}`).once(() => {
    gun.get(`~@${$("#alias").val()}`).once((data) => {
      if (data == undefined) {
        $("#error").html("");
        user.create($("#alias").val(), $("#pass").val(), () => {
          window.location.replace(`${window.location.origin}/D-Chat/chat.html`);
        });
      } else {
        $("#error").html("Username Already Exist");
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
          user.auth($("#alias").val(), $("#pass").val(), (data) => {
            if (data.err) {
              $("#error").html("Wrong Username Or Password");
            } else {
              setTimeout(() => {
                window.location.replace(
                  `${window.location.origin}/D-Chat/chat.html`
                );
              }, 1000);
            }
          });
        } else {
          setTimeout(() => {
            window.location.replace(
              `${window.location.origin}/D-Chat/chat.html`
            );
          }, 1000);
        }
      });
    } else {
      setTimeout(() => {
        window.location.replace(`${window.location.origin}/D-Chat/chat.html`);
      }, 1000);
    }
  });
});
