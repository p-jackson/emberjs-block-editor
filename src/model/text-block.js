export default class TextBlock {
  constructor(body = "new body") {
    this.body = body;
  }

  setBody(body) {
    return new TextBlock(body);
  }
}
