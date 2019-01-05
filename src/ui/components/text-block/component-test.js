import { blur, fillIn, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";
import TextBlock from "../../../../src/model/text-block";

module("Integration | Component | text-block", function(hooks) {
  setupRenderingTest(hooks);

  test("it renders body data", async function(assert) {
    this.set("blockData", new TextBlock("body text"));

    await render(hbs`
      <TextBlock @blockData={{blockData}} />
    `);

    assert.equal(this.element.textContent.trim(), "body text");
  });

  test("it renders html as plain text", async function(assert) {
    this.set("blockData", new TextBlock("<b>body text</b>"));

    await render(hbs`
      <TextBlock @blockData={{blockData}} />
    `);

    assert.equal(this.element.textContent.trim(), "<b>body text</b>");
  });

  test("calls onBlockDataChange when user types", async function(assert) {
    assert.expect(1);

    this.set("blockData", new TextBlock({ body: "initial" }));
    this.set("handleBlockDataChange", newData => {
      assert.deepEqual(newData, new TextBlock("changed"));
    });

    await render(hbs`
      <TextBlock @blockData={{blockData}} @onBlockDataChange={{handleBlockDataChange}} />
    `);

    await fillIn("[contenteditable]", "changed");
    await blur("[contenteditable]");
  });
});
