import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("BlockEditor")
export default class BlockEditorComponent extends Component {
  selectedBlockId = null;
  addBlockOptions = ["Text Block", "Image Block"];

  @computed("blockData")
  get blocks() {
    return this.blockData.topLevelBlocks.map(id => ({
      id,
      blockData: this.blockData.blockData[id],
      blockType: this.blockData.blockType[id],
      isTextBlock: this.blockData.blockType[id] === "Text Block",
      isImageBlock: this.blockData.blockType[id] === "Image Block"
    }));
  }

  @computed("blockData", "selectedBlockId")
  get selectedBlockData() {
    return this.blockData.blockData[this.selectedBlockId];
  }

  @computed("blockData", "selectedBlockId")
  get selectedBlockType() {
    return this.blockData.blockType[this.selectedBlockId];
  }

  @action
  addBlockBelow(blockId, blockType) {
    const { newState, newBlockId } = this.blockData.addBlockBelow(
      blockId,
      blockType
    );

    this.onBlockDataChange(newState);

    this.set("selectedBlockId", newBlockId);
  }

  @action
  handleBlockDataChange(changedId, newData) {
    this.onBlockDataChange(this.blockData.setBlock(changedId, newData));
  }

  @action
  handleSelectedBlockDataChange(newData) {
    this.onBlockDataChange(
      this.blockData.setBlock(this.selectedBlockId, newData)
    );
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

    const newState = this.blockData.deleteBlock(this.selectedBlockId);

    this.onBlockDataChange(newState);
    this.set("selectedBlockId", null);
  }
}
