import { classNames } from "@ember-decorators/component";
import { action } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("PopupButton")
export default class PopupButtonComponent extends Component {
  expanded = false;

  @action
  handleButtonClick() {
    this.toggleProperty("expanded");
  }

  @action
  handleOptionClick(option) {
    this.onOptionClick(option);
  }
}
