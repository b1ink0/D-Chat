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
                        if ($(window).width() >= 992) {
                        } else {
                          $("#logo").hide();
                          $("#btns").hide();
                          $("#chats").hide();
                          $("#chat").show();
                        }
                        $("#chat").html(
                          `<div id="chat_nav">
                            <button onclick="handleBack()">
                              <svg
                              xmlns="http://www.w3.org/2000/svg"
                              version="1.1"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              xmlns:svgjs="http://svgjs.com/svgjs"
                              width="512"
                              height="512"
                              x="0"
                              y="0"
                              viewBox="0 0 447.243 447.243"
                              style="enable-background: new 0 0 512 512"
                              xml:space="preserve"
                              class=""
                              >
                                <g>
                                  <g xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                      <path
                                        d="M420.361,192.229c-1.83-0.297-3.682-0.434-5.535-0.41H99.305l6.88-3.2c6.725-3.183,12.843-7.515,18.08-12.8l88.48-88.48    c11.653-11.124,13.611-29.019,4.64-42.4c-10.441-14.259-30.464-17.355-44.724-6.914c-1.152,0.844-2.247,1.764-3.276,2.754    l-160,160C-3.119,213.269-3.13,233.53,9.36,246.034c0.008,0.008,0.017,0.017,0.025,0.025l160,160    c12.514,12.479,32.775,12.451,45.255-0.063c0.982-0.985,1.899-2.033,2.745-3.137c8.971-13.381,7.013-31.276-4.64-42.4    l-88.32-88.64c-4.695-4.7-10.093-8.641-16-11.68l-9.6-4.32h314.24c16.347,0.607,30.689-10.812,33.76-26.88    C449.654,211.494,437.806,195.059,420.361,192.229z"
                                        fill="#000000"
                                        data-original="#000000"
                                        class=""
                                      ></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </button>
                            <h3>${flag ? key : username}</h3>
                          </div>
                          <div class="sub_chat" id="${key}">
                            <ul></ul>
                            <form id="f${key}">
                              <input id="i${key}" type="text" autocomplete="off" maxlength="117" placeholder="Type Message..." required/>
                              <button type="submit">
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                xmlns:svgjs="http://svgjs.com/svgjs"
                                width="512"
                                height="512"
                                x="0"
                                y="0"
                                viewBox="0 0 448.011 448.011"
                                style="enable-background: new 0 0 512 512"
                                xml:space="preserve"
                                class=""
                                >
                                  <g>
                                    <g xmlns="http://www.w3.org/2000/svg">
                                      <g>
                                        <path
                                          d="M438.731,209.463l-416-192c-6.624-3.008-14.528-1.216-19.136,4.48c-4.64,5.696-4.8,13.792-0.384,19.648l136.8,182.4    l-136.8,182.4c-4.416,5.856-4.256,13.984,0.352,19.648c3.104,3.872,7.744,5.952,12.448,5.952c2.272,0,4.544-0.48,6.688-1.472    l416-192c5.696-2.624,9.312-8.288,9.312-14.528S444.395,212.087,438.731,209.463z"
                                          fill="#000000"
                                          data-original="#000000"
                                          class=""
                                        ></path>
                                      </g>
                                    </g>
                                  </g>
                                </svg>
                              </button>
                            </form>
                          </div>`
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
                          $(`#i${key}`).focus();
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
                              let span = document.createElement("span");
                              let text = document.createTextNode(
                                flag ? message : message
                              );
                              if (send) {
                                li.id = "sent";
                              } else {
                                li.id = "received";
                              }
                              span.appendChild(text);
                              li.appendChild(span);
                              $(`#${key} ul`).append(li);
                              if (document.querySelector(".sub_chat ul")) {
                                document
                                  .querySelector(".sub_chat ul")
                                  .scrollTo(
                                    0,
                                    document.querySelector(".sub_chat ul")
                                      .scrollHeight
                                  );
                              }
                            }
                          }
                        });
                        handleBack = () => {
                          $("#chat").hide();
                          $("#logo").show();
                          $("#btns").show();
                          $("#chats").show();
                          $("#chat").html("");
                          window.location.reload();
                        };
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
