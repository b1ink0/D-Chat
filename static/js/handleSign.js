$("#up").on("click", function (e) {
  if ($("#alias").val() != "" && $("#pass").val().length >= 8) {
    gun.get(`~@${$("#alias").val()}`).once(() => {
      gun.get(`~@${$("#alias").val()}`).once((data) => {
        if (data == undefined) {
          $("#error").html("");
          try {
            let tempClassList = $("#loader").attr("class").split(/\s+/);
            if (tempClassList.includes("load_fade_out")) {
              $("#loader").toggleClass("load_fade_out");
            }
            $("#loader").toggleClass("load_fade_in");
          } catch {
            $("#loader").toggleClass("load_fade_in");
          }
          user.create($("#alias").val(), $("#pass").val(), () => {
            setTimeout(() => {
              $("#loader").toggleClass("load_fade_in");
              $("#loader").toggleClass("load_fade_out");
              $("#loader").one(
                "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                function () {
                  $("#loader").toggleClass("load_fade_out");
                  $("#error").html("<h3>Sign Up Complete Now Sign In</h3>");
                }
              );
            }, 1000);
          });
        } else {
          $("#error").html("<h3>Username Already Exist</h3>");
        }
      });
    });
  }
});

const handleSignIn = () => {
  $("#error").html("");
  try {
    let tempClassList = $("#loader").attr("class").split(/\s+/);
    if (tempClassList.includes("load_fade_out")) {
      $("#loader").toggleClass("load_fade_out");
    }
    $("#loader").toggleClass("load_fade_in");
  } catch {
    $("#loader").toggleClass("load_fade_in");
  }
  setTimeout(() => {
    window.location.replace(`${window.location.origin}/D-Chat/chat.html`);
  }, 1000);
};

$("#sign").on("submit", function (e) {
  e.preventDefault();
  user.auth($("#alias").val(), $("#pass").val(), (data) => {
    if (data.err) {
      user.auth($("#alias").val(), $("#pass").val(), (data) => {
        if (data.err) {
          user.auth($("#alias").val(), $("#pass").val(), (data) => {
            if (data.err) {
              $("#error").html("<h3>Wrong Username Or Password</h3>");
            } else {
              handleSignIn();
            }
          });
        } else {
          handleSignIn();
        }
      });
    } else {
      handleSignIn();
    }
  });
});
