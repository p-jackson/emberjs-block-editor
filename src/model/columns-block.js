export default class ColumnsBlock {
  blockIds = [null, null, null];

  constructor(init) {
    if (init) {
      this.blockIds = init.blockIds;
    }
  }

  setColumn(index, blockId) {
    const newBlockIds = [...this.blockIds];
    newBlockIds[index] = blockId;

    return new ColumnsBlock({
      blockIds: newBlockIds
    });
  }
}
