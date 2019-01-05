import { blur, click, fillIn, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import BlockEditor from "../../../../src/model/block-editor";
import TextBlock from "../../../../src/model/text-block";

module("Integration | Component | block-editor", function(hooks) {
  setupRenderingTest(hooks);

  test("contains no blocks when block data is empty", async function(assert) {
    this.set(
      "blockData",
      new BlockEditor({
        topLevelBlocks: [],
        blockData: {},
        blockType: {}
      })
    );

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(
      this.element.querySelectorAll(".BlockEditor-blockContainer").length,
      0
    );
  });

  test("contains 3 blocks when blockData contains 3 blocks", async function(assert) {
    this.set(
      "blockData",
      new BlockEditor({
        topLevelBlocks: ["1", "2", "3"],
        blockData: {},
        blockType: {}
      })
    );

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(
      this.element.querySelectorAll(".BlockEditor-blockContainer").length,
      3
    );
  });

  test("contains a text block", async function(assert) {
    this.set(
      "blockData",
      new BlockEditor({
        topLevelBlocks: ["1"],
        blockData: {
          "1": new TextBlock("")
        },
        blockType: {
          "1": "Text Block"
        }
      })
    );

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.equal(this.element.querySelectorAll(".TextBlock").length, 1);
  });

  test("calls onBlockDataChange action when a second block is added", async function(assert) {
    assert.expect(4);

    const initialData = new BlockEditor({
      topLevelBlocks: ["1"],
      blockData: {
        "1": new TextBlock("")
      },
      blockType: {
        "1": "Text Block"
      }
    });

    this.set("blockData", initialData);

    this.set("handleBlockDataChange", newData => {
      // The existing block stays as it is
      assert.equal(newData.topLevelBlocks[0], "1");
      assert.deepEqual(newData.blockData["1"], initialData.blockData["1"]);

      // There is a new block
      assert.equal(newData.topLevelBlocks.length, 2);
      assert.ok(newData.blockData[newData.topLevelBlocks[1]]);
    });

    await render(hbs`
      <BlockEditor @blockData={{blockData}} @onBlockDataChange={{handleBlockDataChange}} />
    `);

    await click(".BlockEditor-layoutEditButtons button");
    await click(`.BlockEditor-layoutEditButtons [data-testid="Text Block"]`);
  });

  test("calls onBlockDataChange action when a text block is edited", async function(assert) {
    this.set(
      "blockData",
      new BlockEditor({
        topLevelBlocks: ["1"],
        blockData: {
          "1": new TextBlock("initial")
        },
        blockType: {
          "1": "Text Block"
        }
      })
    );

    this.set("handleBlockDataChange", newData => {
      assert.deepEqual(
        newData,
        new BlockEditor({
          topLevelBlocks: ["1"],
          blockData: {
            "1": new TextBlock("changed")
          },
          blockType: {
            "1": "Text Block"
          }
        })
      );
    });

    await render(hbs`
      <BlockEditor @blockData={{blockData}} @onBlockDataChange={{handleBlockDataChange}} />
    `);

    await fillIn("[contenteditable]", "changed");
    await blur("[contenteditable]");
  });

  test("clicking in a block selects the selected block", async function(assert) {
    this.set(
      "blockData",
      new BlockEditor({
        topLevelBlocks: ["1"],
        blockData: {
          "1": new TextBlock("body data")
        },
        blockType: {
          "1": "Text Block"
        }
      })
    );

    await render(hbs`
      <BlockEditor @blockData={{blockData}} />
    `);

    assert.notOk(this.element.querySelector(".BlockPropertyBar"));

    await click(".TextBlock");

    assert.ok(this.element.querySelector(".BlockPropertyBar"));
  });
});
