import Route from "@ember/routing/route";

export default class IndexRoute extends Route {
  model() {
    return {
      topLevelBlocks: ["1"],
      blockData: {
        "1": {
          body: "Get started by editing this text or add a new block below"
        }
      }
    };
  }
}
