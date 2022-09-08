class DOM {
  element;
  constructor(element: HTMLElement) {
    this.element = element;
  }

  flex() {
    return (this.element.style.display = "flex");
  }

  block() {
    return (this.element.style.display = "block");
  }

  hide() {
    return (this.element.style.display = "none");
  }
  appendChild(child: HTMLElement) {
    this.element.appendChild(child);
  }

  removeChild(child: HTMLElement) {
    return this.element.appendChild(child);
  }
}
