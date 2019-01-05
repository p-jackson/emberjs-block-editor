import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockPropertyBar")
export default class BlockPropertyBarComponent extends Component {
  @action
  handleDeleteClick() {
    this.onDelete();
  }

  @computed("blockType")
  get isImageBlock() {
    return this.blockType === "Image Block";
  }
}
