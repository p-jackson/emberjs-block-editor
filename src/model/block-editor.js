import ImageBlock from "./image-block";
import TextBlock from "./text-block";

export default class BlockEditor {
  topLevelBlocks = ["1"];
  blockType = { "1": "Text Block" };
  blockData = {
    "1": new TextBlock(
      "Get started by editing this text or add a new block below"
    )
  };

  constructor(init) {
    if (init) {
      this.topLevelBlocks = init.topLevelBlocks;
      this.blockType = init.blockType;
      this.blockData = init.blockData;
    }
  }

  addBlockBelow(blockId, newBlockType) {
    const position = this.topLevelBlocks.indexOf(blockId) + 1;
    const newBlockId = Math.random().toString(10);

    const newBlockData =
      newBlockType === "Text Block" ? new TextBlock() : new ImageBlock();

    const newState = new BlockEditor({
      topLevelBlocks: [
        ...this.topLevelBlocks.slice(0, position),
        newBlockId,
        ...this.topLevelBlocks.slice(position)
      ],
      blockData: {
        ...this.blockData,
        [newBlockId]: newBlockData
      },
      blockType: {
        ...this.blockType,
        [newBlockId]: newBlockType
      }
    });

    return { newState, newBlockId };
  }

  deleteBlock(id) {
    const index = this.topLevelBlocks.indexOf(id);

    const newBlockData = { ...this.blockData };
    delete newBlockData[id];

    const newBlockType = { ...this.blockType };
    delete newBlockType[id];

    return new BlockEditor({
      topLevelBlocks: [
        ...this.topLevelBlocks.slice(0, index),
        ...this.topLevelBlocks.slice(index + 1)
      ],
      blockData: newBlockData,
      blockType: newBlockType
    });
  }

  setBlock(id, data) {
    return new BlockEditor({
      topLevelBlocks: this.topLevelBlocks,
      blockType: this.blockType,
      blockData: {
        ...this.blockData,
        [id]: data
      }
    });
  }
}
