export default class ImageBlock {
  url = null;
  fullHeight = null;
  displayHeight = null;

  constructor(init) {
    if (init) {
      this.url = init.url;
      this.fullHeight = init.fullHeight;
      this.displayHeight = init.displayHeight;
    }
  }

  async setImage(file) {
    const url = await fileToDataUrl(file);
    const fullHeight = await fileToImageHeight(file);

    return new ImageBlock({
      url,
      fullHeight,
      displayHeight: fullHeight
    });
  }

  setDisplayHeight(displayHeight) {
    return new ImageBlock({
      url: this.url,
      fullHeight: this.fullHeight,
      displayHeight
    });
  }
}

function fileToDataUrl(file) {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      resolve(reader.result);
    });

    reader.readAsDataURL(file);
  });
}

function fileToImageHeight(file) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = function() {
      resolve(this.height);
    };
    img.src = URL.createObjectURL(file);
  });
}
