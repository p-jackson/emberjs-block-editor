import { click, render } from "@ember/test-helpers";
import { setupRenderingTest } from "ember-qunit";
import hbs from "htmlbars-inline-precompile";
import { module, test } from "qunit";

module("Integration | Component | popup-button", function(hooks) {
  setupRenderingTest(hooks);

  test("renders the button text", async function(assert) {
    this.set("options", ["one", "two"]);

    await render(hbs`
      <PopupButton @options={{options}}>Click Me</PopupButton>
    `);

    assert.equal(this.element.textContent.trim(), "Click Me");
  });

  test("renders the options when clicked", async function(assert) {
    this.set("options", ["one", "two"]);

    await render(hbs`
      <PopupButton @options={{options}}>Click Me</PopupButton>
    `);

    await click(".PopupButton-button");

    assert.ok(this.element.textContent.includes("one"));
    assert.ok(this.element.textContent.includes("two"));
  });

  test("calls action when option clicked", async function(assert) {
    assert.expect(1);

    this.set("options", ["one"]);
    this.set("handleOptionClick", () => {
      assert.ok(true);
    });

    await render(hbs`
      <PopupButton @options={{options}} @onOptionClick={{handleOptionClick}}>Click Me</PopupButton>
    `);

    await click(".PopupButton-button");
    await click(`[data-testid="one"]`);
  });
});
