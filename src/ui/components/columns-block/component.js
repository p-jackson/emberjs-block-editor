import { classNames } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from "@ember/component";

@classNames("ColumnsBlock")
export default class ColumnsBlockComponent extends Component {
  addBlockOptions = ["Text Block", "Image Block"];

  @computed("blockData", "editorData")
  get blocks() {
    return this.blockData.blockIds.map((id, index) => {
      if (!id) {
        return { index };
      }

      return {
        id,
        blockData: this.editorData.blockData[id],
        blockType: this.editorData.blockType[id],
        isTextBlock: this.editorData.blockType[id] === "Text Block",
        isImageBlock: this.editorData.blockType[id] === "Image Block"
      };
    });
  }

  @action
  addBlock(index, blockType) {
    const newEditorState = this.editorData.addBlockToColumn(
      this.blockId,
      index,
      blockType
    );
    this.onEditorStateChange(newEditorState);
  }

  @action
  handleBlockDataChange(changedId, newData) {
    this.onEditorStateChange(this.editorData.setBlock(changedId, newData));
  }

  @action
  handleBlockSelected(blockId) {
    event._selectingBlock = true;
    this.onBlockSelected(blockId);
  }
}
