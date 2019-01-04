import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockEditor")
export default class BlockEditorComponent extends Component {
  @computed("blockData")
  get blocks() {
    return this.blockData.topLevelBlocks.map(id => ({
      id,
      ...this.blockData.blockData[id]
    }));
  }

  @action
  addBlockBelow(block) {
    const position = this.blockData.topLevelBlocks.indexOf(block.id) + 1;
    const newId = Math.random().toString(10);

    this.onBlockDataChange({
      topLevelBlocks: [
        ...this.blockData.topLevelBlocks.slice(0, position),
        newId,
        ...this.blockData.topLevelBlocks.slice(position)
      ],
      blockData: {
        ...this.blockData.blockData,
        [newId]: {
          body: "new body"
        }
      }
    });
  }

  @action
  handleBlockDataChange(changedId, newData) {
    this.onBlockDataChange({
      ...this.blockData,
      blockData: {
        ...this.blockData.blockData,
        [changedId]: newData
      }
    });
  }
}
