import { blur, click, fillIn, visit } from "@ember/test-helpers";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | block editor", function(hooks) {
  setupApplicationTest(hooks);

  test("renders onbording text", async function(assert) {
    await visit("/");

    assert.ok(
      this.element.textContent.includes("Get started by editing this text")
    );
  });

  test("can delete blocks", async function(assert) {
    await visit("/");

    const firstTextBlock = this.element.querySelectorAll(
      "[contenteditable]"
    )[0];
    await fillIn(firstTextBlock, "first block");
    await blur(firstTextBlock);

    await click(".BlockEditor-addBelowButton");

    const secondTextBlock = this.element.querySelectorAll(
      "[contenteditable]"
    )[1];
    await fillIn(secondTextBlock, "second block");
    await blur(secondTextBlock);

    // Focus text block to show block properties in side bar
    await focus(secondTextBlock);

    await click(".BlockPropertyBar-deleteButton");

    assert.ok(this.element.textContent.includes("first block"));
    assert.notOk(this.element.textContent.includes("second block"));
  });
});
