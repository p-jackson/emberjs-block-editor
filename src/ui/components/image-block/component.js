import { classNames } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from "@ember/component";
import { htmlSafe } from "@ember/template";

@classNames("ImageBlock")
export default class ImageBlockComponent extends Component {
  @computed("blockData")
  get inlineStyle() {
    if (typeof this.blockData.displayHeight !== "number") return "";
    return htmlSafe(`height: ${this.blockData.displayHeight}px`);
  }
}
