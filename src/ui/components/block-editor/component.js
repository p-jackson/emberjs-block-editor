import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockEditor")
export default class BlockEditorComponent extends Component {
  selectedBlockId = null;
  addBlockOptions = ["Text Block"];

  @computed("blockData")
  get blocks() {
    return this.blockData.topLevelBlocks.map(id => ({
      id,
      blockData: this.blockData.blockData[id],
      blockType: this.blockData.blockType[id]
    }));
  }

  @action
  addBlockBelow(blockId, blockType) {
    const position = this.blockData.topLevelBlocks.indexOf(blockId) + 1;
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
      },
      blockType: {
        [newId]: blockType
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
  handleBlockSelected(blockId) {
    event._selectingBlock = true;
    this.set("selectedBlockId", blockId);
  }

  @action
  handleBubbleClick() {
    if (!event._selectingBlock) this.set("selectedBlockId", null);
  }

  @action
  handleBlockDelete() {
    if (!this.selectedBlockId) return;

    const id = this.selectedBlockId;
    const index = this.blockData.topLevelBlocks.indexOf(id);

    const newBlockData = { ...this.blockData.blockData };
    delete newBlockData[id];

    const newBlockType = { ...this.blockData.blockType };
    delete newBlockType[id];

    this.onBlockDataChange({
      topLevelBlocks: [
        ...this.blockData.topLevelBlocks.slice(0, index),
        ...this.blockData.topLevelBlocks.slice(index + 1)
      ],
      blockData: newBlockData,
      blockType: newBlockType
    });

    this.set("selectedBlock", null);
  }
}
