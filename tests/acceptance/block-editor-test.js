import { visit } from "@ember/test-helpers";
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
});
