import { attribute, classNames } from "@ember-decorators/component";
import Component from "@ember/component";

@classNames("TextBlock")
export default class TextBlockComponent extends Component {
  @attribute contenteditable = true;
  @attribute tabIndex = 0;

  focusOut() {
    this.onBlockDataChange({ body: this.element.textContent });
    return true;
  }
}
