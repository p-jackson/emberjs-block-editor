import { classNames } from "@ember-decorators/component";
import { action } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockPropertyBar")
export default class BlockPropertyBarComponent extends Component {
  @action
  handleDeleteClick() {
    this.onDelete();
  }
}
