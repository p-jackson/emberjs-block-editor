import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockEditor")
export default class BlockEditorComponent extends Component {
  selectedBlock = null;

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

  @action
  handleBlockSelected(block) {
    event._selectingBlock = true;
    this.set("selectedBlock", block);
  }

  @action
  handleBubbleClick() {
    if (!event._selectingBlock) this.set("selectedBlock", null);
  }

  @action
  handleBlockDelete() {
    if (!this.selectedBlock) return;

    const id = this.selectedBlock.id;
    const index = this.blockData.topLevelBlocks.indexOf(id);

    const newBlockData = { ...this.blockData.blockData };
    delete newBlockData[id];

    this.onBlockDataChange({
      topLevelBlocks: [
        ...this.blockData.topLevelBlocks.slice(0, index),
        ...this.blockData.topLevelBlocks.slice(index + 1)
      ],
      blockData: newBlockData
    });

    this.set("selectedBlock", null);
  }
}
