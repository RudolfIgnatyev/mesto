class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => this.addItem(this._renderer(item)));
  }

  addItem(DOMElement) {
    this._container.append(DOMElement);
  }
}

export { Section };
