"use strict";
class DOM {
    constructor(element) {
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
    appendChild(child) {
        this.element.appendChild(child);
    }
    removeChild(child) {
        return this.element.appendChild(child);
    }
}
