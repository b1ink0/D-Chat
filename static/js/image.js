function Handle() {
  let validExtensions = ["jpg", "jpeg", "gif", "png", "webp"];
  let filesSelected = document.getElementById("inputFileToLoad").files;

  if (filesSelected.length > 0) {
    let fileToLoad = filesSelected[0];
    let fileName = fileToLoad.name;
    let fileSize = (fileToLoad.size / 1024 / 1024).toFixed(4);
    let fileExtension = fileName.substr(fileName.lastIndexOf(".") + 1);
    if (validExtensions.includes(fileExtension)) {
      if (fileSize < 1) {
        let fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
          let srcData = fileLoadedEvent.target.result; // <--- data: base64

          let newImage = document.createElement("img");
          newImage.src = srcData;

          document.getElementById("imgTest").innerHTML = newImage.outerHTML;
        };
        fileReader.readAsDataURL(fileToLoad);
      } else {
        document.getElementById("imgTest").innerHTML =
          "File Size Should Be Less Than 1MB";
      }
    } else {
      document.getElementById("imgTest").innerHTML = "Invilid Image Format";
    }
  }
}
