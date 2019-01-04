import { classNames } from "@ember-decorators/component";
import { computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockEditor")
export default class BlockEditorComponent extends Component {
  @computed("blockData")
  get blocks() {
    return this.blockData.topLevelBlocks.map(i => this.blockData.blockData[i]);
  }
}
