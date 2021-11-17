import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  format() {
    let stripped = this.element.value.replace(/[^+\d]/g, "")
    this.element.value = stripped.replace(/(\d{1,3})(\d{1,3})?(\d{1,4})?/g, (_, p1, p2, p3) => {
      let formatted = (p1 && p2) ? `(${p1}) ${p2}` :  `(${p1}`;
      if (p3) formatted += `-${p3}`;
      return formatted;
    })
  }
}