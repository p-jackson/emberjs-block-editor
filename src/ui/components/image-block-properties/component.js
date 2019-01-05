import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";
import { Promise } from "rsvp";

@classNames("ImageBlockProperties")
export default class ImageBlockPropertiesComponent extends Component {
  @computed("blockData")
  get hasNoImage() {
    return !this.blockData.url;
  }

  @computed("blockData")
  get heightPercent() {
    if (this.hasNoImage) return 100;
    else
      return Math.ceil(
        (100 * this.blockData.displayHeight) / this.blockData.fullHeight
      );
  }

  @action
  async handleImageChange() {
    const file = event.currentTarget.files[0];
    if (!file) return;

    const url = await fileToDataUrl(file);
    const fullHeight = await fileToImageHeight(file);

    this.onChange({
      ...this.blockData,
      url,
      fullHeight,
      displayHeight: fullHeight
    });
  }

  @action
  handleSizeChange() {
    const displayHeight = Math.ceil(
      (event.currentTarget.valueAsNumber * this.blockData.fullHeight) / 100
    );

    this.onChange({
      ...this.blockData,
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
