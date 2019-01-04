import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | text-block", function(hooks) {
  setupRenderingTest(hooks);

  test("it render body data", async function(assert) {
    this.set("blockData", { body: "body text" });

    await render(hbs`
      <TextBlock @blockData={{blockData}} />
    `);

    assert.equal(this.element.textContent.trim(), "body text");
  });

  test("it renders html as plain text", async function(assert) {
    this.set("blockData", { body: "<b>body text</b>" });

    await render(hbs`
      <TextBlock @blockData={{blockData}} />
    `);

    assert.equal(this.element.textContent.trim(), "<b>body text</b>");
  });
});
