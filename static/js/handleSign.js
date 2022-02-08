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
