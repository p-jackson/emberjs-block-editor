import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | block-editor", function(hooks) {
  setupRenderingTest(hooks);

  test("contains no blocks when block data is empty", async function(assert) {
    this.set("blockData", {
      topLevelBlocks: [],
      blockData: {}
    });

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(
      this.element.querySelectorAll(".BlockEditor-blockContainer").length,
      0
    );
  });

  test("contains 3 blocks when blockData contains 3 blocks", async function(assert) {
    this.set("blockData", {
      topLevelBlocks: ["1", "2", "3"],
      blockData: {}
    });

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(
      this.element.querySelectorAll(".BlockEditor-blockContainer").length,
      3
    );
  });

  test("contains a text block", async function(assert) {
    this.set("blockData", {
      topLevelBlocks: ["1"],
      blockData: {
        "1": { body: "" }
      }
    });

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(this.element.querySelectorAll(".TextBlock").length, 1);
  });
});
