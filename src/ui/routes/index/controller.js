import { action } from "@ember-decorators/object";
import Controller from "@ember/controller";
import BlockEditor from "../../../model/block-editor";

export default class IndexController extends Controller {
  blockData = new BlockEditor();

  @action
  handleBlockDataChange(newBlockData) {
    this.set("blockData", newBlockData);
  }
}
