import { click, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | block-property-bar", function(hooks) {
  setupRenderingTest(hooks);

  test("onDelete called when button clicked", async function(assert) {
    assert.expect(1);

    this.set("handleDelete", () => {
      assert.ok(true);
    });

    await render(hbs`
      <BlockPropertyBar @onDelete={{handleDelete}} />
    `);

    await click(`[data-testid="deleteBlockButton"`);
  });
});
