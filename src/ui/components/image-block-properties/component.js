import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

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

    this.onChange(await this.blockData.setImage(file));
  }

  @action
  handleSizeChange() {
    const displayHeight = Math.ceil(
      (event.currentTarget.valueAsNumber * this.blockData.fullHeight) / 100
    );

    this.onChange(this.blockData.setDisplayHeight(displayHeight));
  }
}
