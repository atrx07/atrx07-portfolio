import "@testing-library/jest-dom/vitest";

Object.defineProperty(window.HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
});

if (!HTMLDialogElement.prototype.showModal) {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute("open", "");
  };
}

if (!HTMLDialogElement.prototype.close) {
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
}
