import { action } from "@ember-decorators/object";
import Controller from "@ember/controller";

export default class IndexController extends Controller {
  blockData = {
    topLevelBlocks: ["1"],
    blockData: {
      "1": {
        body: "Get started by editing this text or add a new block below"
      }
    },
    blockType: {
      "1": "Text Block"
    }
  };

  @action
  handleBlockDataChange(newBlockData) {
    this.set("blockData", newBlockData);
  }
}
